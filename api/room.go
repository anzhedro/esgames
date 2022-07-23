package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

type Room struct {
	Name string

	mu    sync.Mutex // guards fields below
	Users map[string]*User
	Chat  []chatMsg // last 100 messages
}

func NewRoom(name string) *Room {
	return &Room{
		Name:  name,
		Users: make(map[string]*User),
	}
}

func (r *Room) Handle(c *websocket.Conn, l *LoginReq) error {
	if ok := r.join(l, c); !ok {
		resp := LoginResp{
			Type:   "login_failed",
			Reason: fmt.Sprintf("user %s already exists in room %s", l.User, r.Name),
		}
		if err := c.WriteJSON(resp); err != nil {
			return fmt.Errorf("failed to respond to login: %s", err)
		}
		return errors.New("user already exists")
	}
	defer func() {
		r.leave(l.User)
		r.broadcastRoomChange()
	}()

	if err := c.WriteJSON(LoginResp{Type: "login_success"}); err != nil {
		return fmt.Errorf("failed to respond to login: %s", err)
	}

	r.broadcastRoomChange()

	if err := c.WriteMessage(websocket.TextMessage, r.chatHistory()); err != nil {
		return fmt.Errorf("failed to send chat history: %s", err)
	}

	for {
		kind, raw, err := readMsg(c)
		if err != nil {
			return fmt.Errorf("failed to read message: %s", err)
		}
		log.Printf("[%s/%s]: %s %s\n", r.Name, l.User, kind, raw)

		switch kind {
		case "chat":
			msg, err := unmarshalAs[NewMessage](raw)
			if err != nil {
				return fmt.Errorf("failed to unmarshal chat message: %s", err)
			}
			r.sendMsg(l.User, msg.Text, true)
		case "kick_user":
			msg, err := unmarshalAs[KickMessage](raw)
			if err != nil {
				return fmt.Errorf("failed to unmarshal kick message: %s", err)
			}
			if err := r.handleKick(msg.User, l); err != nil {
				return fmt.Errorf("failed to kick: %s", err)
			}
		}
	}
}

func (r *Room) handleKick(user string, l *LoginReq) error {
	if user == l.User {
		r.sendMsg("SYSTEM", fmt.Sprintf("%q tried to kick themselves", user), true)
		return nil
	}
	r.mu.Lock()
	u, ok := r.Users[user]
	if !ok {
		r.mu.Unlock()
		return nil
	}
	delete(r.Users, user)
	r.mu.Unlock()
	kR := KickResp{Type: "kick_user", Reason: fmt.Sprintf("You were kicked by %s", l.User)}
	if err := u.C.WriteJSON(kR); err != nil {
		return fmt.Errorf("failed to respond to kick_user: %s", err)
	}
	u.C.Close()
	r.sendMsg("SYSTEM", fmt.Sprintf("%q was kicked from the room", user), true)
	r.broadcastRoomChange()
	return nil
}

func (r *Room) chatHistory() []byte {
	r.mu.Lock()
	msgs := make([]ChatBatchItem, len(r.Chat))
	for i, cm := range r.Chat {
		msgs[i] = cm.ToItem()
	}
	r.mu.Unlock()

	return marshalChatBatch(msgs...)
}

func (r *Room) broadcastRoomChange() {
	r.mu.Lock()
	defer r.mu.Unlock()

	msg := RoomMsg{Type: "room", Users: make([]UserInfo, 0, len(r.Users))}

	for _, u := range r.Users {
		msg.Users = append(msg.Users, UserInfo{
			Name:   u.Name,
			IsHost: u.IsHost,
			Avatar: u.Avatar,
		})
	}

	for name, u := range r.Users {
		if err := u.C.WriteJSON(msg); err != nil {
			log.Printf("failed to send room update to %s: %s\n", name, err)
		}
	}
}

func (r *Room) broadcast(blob []byte) {
	r.mu.Lock()
	conns := make(map[string]*websocket.Conn)
	for name := range r.Users {
		conns[name] = r.Users[name].C
	}
	r.mu.Unlock()

	for name, c := range conns {
		if err := c.WriteMessage(websocket.TextMessage, blob); err != nil {
			log.Printf("failed to resend a message to %s: %s\n", name, err)
		}
	}
}

// Returns true if the user joined successfully.
func (r *Room) join(l *LoginReq, c *websocket.Conn) bool {
	r.mu.Lock()
	user, alreadyExists := r.Users[l.User]
	if user == nil {
		user = &User{
			Name:   l.User,
			IsHost: len(r.Users) == 0,
			Avatar: l.Avatar,
			C:      c,
		}
		r.Users[l.User] = user
	}
	r.mu.Unlock()
	return !alreadyExists
}

// Sends message to all users in the room.
func (r *Room) sendMsg(user string, msg string, saveToHistory bool) {
	cm := chatMsg{
		User:    user,
		Text:    msg,
		Created: time.Now(),
	}
	if saveToHistory {
		r.mu.Lock()
		r.Chat = append(r.Chat, cm)
		if len(r.Chat) > 100 {
			r.Chat = r.Chat[1:]
		}
		r.mu.Unlock()
	}
	r.broadcast(marshalChatBatch(cm.ToItem()))
}

func (r *Room) leave(username string) {
	r.mu.Lock()
	delete(r.Users, username)
	r.mu.Unlock()
}

type User struct {
	Name   string
	IsHost bool
	Avatar int
	C      *websocket.Conn
}

type chatMsg struct {
	User    string
	Text    string
	Created time.Time
}

func (c *chatMsg) ToItem() ChatBatchItem {
	return ChatBatchItem{
		User:    c.User,
		Text:    c.Text,
		Created: c.Created.UTC().Format("2006-01-02 15:04:05"),
	}
}

func marshalChatBatch(msgs ...ChatBatchItem) []byte {
	blob, err := json.Marshal(ChatBatch{Type: "chat", Messages: msgs})
	if err != nil {
		log.Fatalf("failed to marshal chat messages: %s", err)
	}
	return blob
}
