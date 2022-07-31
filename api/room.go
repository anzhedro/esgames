package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"sort"
	"sync"
	"time"

	"github.com/anzhedro/esgames/api/game"
	"github.com/gorilla/websocket"
)

type Room struct {
	Name     string
	Host     string // name of the user who created the room
	Registry map[string]StartGameFn

	mu    sync.Mutex // guards fields below
	users map[string]*User
	chat  []chatMsg // last 100 messages

	game struct {
		sync.RWMutex
		info *gameInfo // if empty, no game started
	}
}

type gameInfo struct {
	Game   game.Game
	Name   string
	Events chan game.Event
}

func NewRoom(registry map[string]StartGameFn, name, host string) *Room {
	return &Room{
		Name:     name,
		Host:     host,
		Registry: registry,
		users:    make(map[string]*User),
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

	if err := c.WriteJSON(LoginResp{Type: "login_success", Room: r.Name}); err != nil {
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
			r.onChatMsg(l.User, msg.Text)
		case "kick_user":
			msg, err := unmarshalAs[KickMessage](raw)
			if err != nil {
				return fmt.Errorf("failed to unmarshal kick message: %s", err)
			}
			if err := r.handleKick(msg.User, l); err != nil {
				log.Printf("failed to kick: %s", err)
				continue
			}
		case "start_game":
			if l.User != r.Host {
				return errors.New("only host can start a game")
			}

			msg, err := unmarshalAs[StartGameMessage](raw)
			if err != nil {
				return fmt.Errorf("failed to unmarshal start game message: %s", err)
			}

			startGame, ok := r.Registry[msg.Game]
			if !ok {
				return fmt.Errorf("unknown game %q", msg.Game)
			}
			newGame, err := startGame(r, msg.Settings)
			if err != nil {
				return fmt.Errorf("failed to start game %q: %v", msg.Game, err)
			}

			events := make(chan game.Event, 32)

			r.game.Lock()
			if r.game.info != nil {
				r.game.Unlock()
				return errors.New("game already in progress")
			}
			r.game.info = &gameInfo{
				Game:   newGame,
				Name:   msg.Game,
				Events: events,
			}
			r.game.Unlock()

			r.broadcastRoomChange()

			go func() {
				newGame.Run(events)

				r.game.Lock()
				r.game.info = nil
				r.game.Unlock()
				close(events)

				r.broadcastRoomChange()
			}()

		case "game_action":
			// {type: "game_action", action: "ready", payload: {...}}
			msg, err := unmarshalAs[GameAction](raw)
			if err != nil {
				return fmt.Errorf("failed to unmarshal game action: %s", err)
			}
			r.game.RLock()
			if r.game.info == nil {
				r.game.RUnlock()
				return errors.New("no game in progress")
			}
			r.game.info.Events <- &game.UserAction{User: l.User, Action: msg.Action, Payload: msg.Payload}
			r.game.RUnlock()
		}
	}
}

func (r *Room) Users() []string {
	r.mu.Lock()
	defer r.mu.Unlock()

	ret := make([]string, 0, len(r.users))
	for user := range r.users {
		ret = append(ret, user)
	}
	sort.Strings(ret)
	return ret
}

// SendGameChat message to a given user, without adding it to the history.
func (r *Room) SendGameChat(user string, m game.NewChatMessage) {
	r.mu.Lock()
	u := r.users[user]
	r.mu.Unlock()
	if u == nil {
		return
	}

	msg := chatMsg{User: m.User, Text: m.Text, Created: m.Created}

	if err := u.C.WriteMessage(websocket.TextMessage, marshalChatBatch(msg.ToItem())); err != nil {
		log.Printf("failed to send a chat message within a game to %s: %s\n", user, err)
	}
}

func (r *Room) SendGameAction(action string, payload any, users ...string) {
	conns := make([]*User, 0, len(users))
	r.mu.Lock()
	for _, name := range users {
		if u := r.users[name]; u != nil {
			conns = append(conns, u)
		} else {
			log.Printf("Failed to send game action %q to %s: user not found\n", action, name)
		}
	}
	r.mu.Unlock()

	if len(conns) == 0 {
		return
	}

	o := map[string]any{"type": "game_action", "action": action}
	if payload != nil {
		o["payload"] = payload
	}
	blob, err := json.Marshal(o)
	if err != nil {
		log.Fatalf("Failed to marshal message %#v: %s", o, err)
	}

	for _, u := range conns {
		if err := u.C.WriteMessage(websocket.TextMessage, blob); err != nil {
			log.Printf("Failed to send a message to %s: %s\n", u.Name, err)
		}
	}
}

func (r *Room) Broadcast(msg any) {
	blob, err := json.Marshal(msg)
	if err != nil {
		log.Fatalf("failed to marshal message %#v: %s", msg, err)
	}

	r.mu.Lock()
	conns := make(map[string]*websocket.Conn)
	for name := range r.users {
		conns[name] = r.users[name].C
	}
	r.mu.Unlock()

	for name, c := range conns {
		if err := c.WriteMessage(websocket.TextMessage, blob); err != nil {
			log.Printf("failed to resend a message to %s: %s\n", name, err)
		}
	}
}

func (r *Room) handleKick(user string, l *LoginReq) error {
	if user == l.User {
		r.onChatMsg("SYSTEM", fmt.Sprintf("%q tried to kick themselves", user))
		return errors.New("user tried to kick themselves")
	}

	if l.User != r.Host {
		return errors.New("user is not a host")
	}

	u := r.leave(user)
	if u == nil { // there was no such user
		return nil
	}

	resp := KickResp{Type: "kick_user", Reason: fmt.Sprintf("You were kicked by %s", l.User)}
	if err := u.C.WriteJSON(resp); err != nil {
		return fmt.Errorf("failed to respond to kick_user: %s", err)
	}
	u.C.Close()
	r.onChatMsg("SYSTEM", fmt.Sprintf("%q was kicked out of the room", user))
	r.broadcastRoomChange()
	return nil
}

func (r *Room) chatHistory() json.RawMessage {
	r.mu.Lock()
	msgs := make([]ChatBatchItem, len(r.chat))
	for i, cm := range r.chat {
		msgs[i] = cm.ToItem()
	}
	r.mu.Unlock()

	return marshalChatBatch(msgs...)
}

func (r *Room) broadcastRoomChange() {
	msg := RoomMsg{
		Type: "room",
	}

	r.game.RLock()
	if info := r.game.info; info != nil {
		msg.Game = info.Name
	}
	r.game.RUnlock()

	r.mu.Lock()
	defer r.mu.Unlock()

	msg.Users = make([]UserInfo, 0, len(r.users))

	if host := r.users[r.Host]; host != nil {
		msg.Users = append(msg.Users, UserInfo{
			Name:   host.Name,
			IsHost: true,
			Avatar: host.Avatar,
		})
	}

	for _, u := range r.users {
		if u.Name != r.Host {
			msg.Users = append(msg.Users, UserInfo{
				Name:   u.Name,
				Avatar: u.Avatar,
			})
		}
	}

	sort.Slice(msg.Users, func(i, j int) bool {
		return msg.Users[i].Name < msg.Users[j].Name
	})

	raw, err := json.Marshal(msg)
	if err != nil {
		log.Fatalf("Failed to marshal room message: %s. Msg:\n%#v", err, msg)
		return
	}

	for name, u := range r.users {
		if err := u.C.WriteMessage(websocket.TextMessage, raw); err != nil {
			log.Printf("failed to send room update to %s: %s\n", name, err)
		}
	}
}

// Returns true iff the user joined successfully.
func (r *Room) join(l *LoginReq, c *websocket.Conn) bool {
	r.mu.Lock()
	user, alreadyExists := r.users[l.User]
	if user == nil {
		user = &User{
			Name:   l.User,
			Avatar: l.Avatar,
			C:      c,
		}
		r.users[l.User] = user
	}
	r.mu.Unlock()
	return !alreadyExists
}

// Sends message to the current game, if any. If the game does not hijack the message,
// broadcasts it to all users in the room.
func (r *Room) onChatMsg(user string, msg string) {
	cm := chatMsg{
		User:    user,
		Text:    msg,
		Created: time.Now(),
	}

	var chatHijacked bool
	r.game.RLock()
	if r.game.info != nil {
		chatHijacked = game.HijacksChat(r.game.info.Game)
		r.game.info.Events <- &game.NewChatMessage{User: user, Text: msg, Created: cm.Created}
	}
	r.game.RUnlock()

	if chatHijacked {
		return
	}

	r.mu.Lock()
	r.chat = append(r.chat, cm)
	if len(r.chat) > 100 {
		r.chat = r.chat[1:]
	}
	r.mu.Unlock()
	r.Broadcast(marshalChatBatch(cm.ToItem()))
}

// Returns true if the user was present.
func (r *Room) leave(username string) *User {
	r.mu.Lock()
	defer r.mu.Unlock()

	u := r.users[username]
	delete(r.users, username)
	return u
}

type User struct {
	Name   string
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

func marshalChatBatch(msgs ...ChatBatchItem) json.RawMessage {
	blob, err := json.Marshal(ChatBatch{Type: "chat", Messages: msgs})
	if err != nil {
		log.Fatalf("failed to marshal chat messages: %s", err)
	}
	return blob
}
