/*
Protocol:

1) We log in into a room
Request: {"user":"user1","room":"room1", "avatar": 12}
Response: "OK"

{ "type": "login_success" }
{ "type": "login_fail", "reason": "already_logged_in" }
{ "type": "login_fail", "reason": "room full" }

2) User can send a chat message into the room
Request: {"type":"chat","text":"Hello world"}

3) Server can push back other users' chat messages
Pushing:
{
	"type":"chat",
	"messages": [
		{
			"text":"Hello world",
			"user":"user2",
			"created":"2020-01-01 00:00:00"
		},
		{
			"text":"Hello world",
			"user":"user3",
			"created":"2020-01-01 00:00:00"
		},
	]
}

4) Sets the current state of the room.
Pushing {"type":"room","users":[{name:"user1", avatar:12, is_host:true}]}
*/
package api

import (
	"encoding/json"
	"fmt"

	"github.com/gorilla/websocket"
)

type LoginReq struct {
	User   string `json:"user"`
	Room   string `json:"room"`
	Avatar int    `json:"avatar"`
}

type RoomMsg struct {
	Type  string     `json:"type"`
	Users []UserInfo `json:"users"`
}

type UserInfo struct {
	Name   string `json:"name"`
	IsHost bool   `json:"is_host"`
	Avatar int    `json:"avatar"`
}

type NewMessage struct {
	Text string `json:"text"`
}

type KickMessage struct {
	User string `json:"user"`
}

type KickResp struct {
	Type   string `json:"type"`
	Reason string `json:"reason,omitempty"`
}

type ChatBatch struct {
	Type     string          `json:"type"`
	Messages []ChatBatchItem `json:"messages"`
}

type ChatBatchItem struct {
	User    string `json:"user"`
	Text    string `json:"text"`
	Created string `json:"created"`
}

type LoginResp struct {
	Type   string `json:"type"`
	Room   string `json:"room"`
	Reason string `json:"reason,omitempty"`
}

// Returns message type, raw message, and an error if reading failed.
func readMsg(c *websocket.Conn) (string, []byte, error) {
	_, msg, err := c.ReadMessage()
	if err != nil {
		return "", nil, fmt.Errorf("read: %w", err)
	}

	var out struct {
		Type string `json:"type"`
	}
	if err := json.Unmarshal(msg, &out); err != nil {
		return "", msg, fmt.Errorf("unmarshal: %w", err)
	}
	return out.Type, msg, nil
}

func unmarshalAs[T any](msg []byte) (T, error) {
	var out T
	if err := json.Unmarshal(msg, &out); err != nil {
		return out, fmt.Errorf("unmarshal: %w", err)
	}
	return out, nil
}
