package game

import (
	"encoding/json"
	"time"
)

type Game interface {
	Run(<-chan Event)
}

// Embed into a game to let the room know that the game is handling chat messages, so Room will not
// broadcast chat messages to users.
type ChatHijackerMixin struct{}

func (ChatHijackerMixin) _hijackChat() {}

func HijacksChat(g Game) bool {
	_, ok := g.(interface{ _hijackChat() })
	return ok
}

type Event interface {
	_event()
}

func (*UserJoined) _event()     {}
func (*UserLeft) _event()       {}
func (*NewChatMessage) _event() {}
func (*UserAction) _event()     {}

type UserJoined struct {
	User string
}

type UserLeft struct {
	User string
}

type NewChatMessage struct {
	User    string
	Text    string
	Created time.Time
}

type UserAction struct {
	User    string
	Action  string
	Payload json.RawMessage
}
