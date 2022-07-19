package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func echo(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer c.Close()

	login, _, err := readAs[LoginReq](c)
	if err != nil {
		log.Printf("ERR: Failed to read login: %s", err)
		return
	}
	log.Printf("Login: %s", login)

	// TODO: Get or create a room

	if err := writeMsg(c, LoginResp{Type: "login_success"}); err != nil {
		log.Printf("ERR: Failed to respond to login: %s", err)
		return
	}

	// TODO: Resend the current room state (users connected, chat, etc).

	for {
		msg, raw, err := readAs[RoomMsg](c)
		if err != nil {
			log.Printf("ERR: Failed to read message: %s", err)
			return
		}
		log.Printf("Msg: %s", msg)

		switch msg.Type {
		case "chat":
			var chat ChatMsg
			if err := json.Unmarshal(raw, &chat); err != nil {
				log.Printf("unmarshal chat: %v", err)
				return
			}
			// TODO: relay chat message to all users in the room
		}
	}
}

func readAs[T any](c *websocket.Conn) (*T, []byte, error) {
	_, msg, err := c.ReadMessage()
	if err != nil {
		return nil, nil, fmt.Errorf("read: %w", err)
	}
	log.Printf("recv: %s", msg)
	var out T
	if err := json.Unmarshal(msg, &out); err != nil {
		return nil, msg, fmt.Errorf("unmarshal: %w", err)
	}
	return &out, msg, nil
}

func writeMsg(c *websocket.Conn, msg any) error {
	var blob []byte
	if s, ok := msg.(string); ok {
		blob = []byte(s)
	} else {
		var err error
		if blob, err = json.Marshal(msg); err != nil {
			return fmt.Errorf("marshal: %w", err)
		}
	}
	if err := c.WriteMessage(websocket.BinaryMessage, blob); err != nil {
		return fmt.Errorf("write: %w", err)
	}
	return nil
}

type LoginReq struct {
	User string `json:"user"`
	Room string `json:"room"`
}

type RoomMsg struct {
	Type string `json:"type"`
}

type ChatMsg struct {
	User string `json:"user,omitempty"`
	Text string `json:"text"`
}

type LoginResp struct {
	Type   string `json:"type"`
	Reason string `json:"reason,omitempty"`
}

func main() {
	http.HandleFunc("/ws", echo)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

/*
1) We log in into a room
Request: {"user":"user1","room":"room1"}
Response: "OK"

{ "type": "login_success" }
{ "type": "login_fail", "reason": "already_logged_in" }
{ "type": "login_fail", "reason": "room full" }


2) User can send a chat message into the room
Request: {"type":"chat","text":"Hello world"}

3) Server can push back other users' chat messages
Pushing {"type":"chat","text":"Hello world", "user":"user2"}
*/
