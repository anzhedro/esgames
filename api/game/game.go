package game

import (
	"encoding/json"
	"time"
)

type Game interface {
	Run(<-chan Event)
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
	User string
	Msg  string
	Time time.Time
}

type UserAction struct {
	User   string
	Action json.RawMessage
}
