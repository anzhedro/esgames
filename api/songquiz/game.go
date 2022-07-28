package songquiz

import (
	"encoding/json"
	"fmt"

	"github.com/anzhedro/esgames/api"
	"github.com/anzhedro/esgames/api/game"
)

const Name = "songquiz"

type Game struct {
	Settings
	Room *api.Room
}

func NewGame(room *api.Room, settings json.RawMessage) (game.Game, error) {
	var s Settings
	if err := json.Unmarshal(settings, &s); err != nil {
		return nil, fmt.Errorf("failed to parse settings: %v", err)
	}
	if err := s.Validate(); err != nil {
		return nil, fmt.Errorf("invalid settings: %v", err)
	}

	ret := &Game{
		Settings: s,
		Room:     room,
	}
	return ret, nil
}

func (g *Game) Run(events <-chan game.Event) {
	for ev := range events {
		switch ev := ev.(type) {
		case *game.UserAction:
			fmt.Printf("songquiz: %v:%s %s\n", ev.User, ev.Action, string(ev.Payload))
		}
	}
}
