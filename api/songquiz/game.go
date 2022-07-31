package songquiz

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"math/rand"
	"sort"
	"time"

	"github.com/anzhedro/esgames/api"
	"github.com/anzhedro/esgames/api/game"
)

const Name = "songquiz"

type Game struct {
	game.ChatHijackerMixin // we handle chat ourselves

	Settings
	Room        *api.Room
	Users       []string
	TotalScores map[string]int64
	Stage       stage

	// Filled in in pickSongStage
	Rounds  []*UserSong
	RoundId int

	// Filled in in roundStage
	RoundStats []map[string]int64 // roundId -> user -> time in milliseconds
}

func NewGame(room *api.Room, settings json.RawMessage) (game.Game, error) {
	var s Settings
	if err := json.Unmarshal(settings, &s); err != nil {
		return nil, fmt.Errorf("failed to parse settings: %v. Raw: %s", err, string(settings))
	}
	if err := s.Validate(); err != nil {
		return nil, fmt.Errorf("invalid settings: %v", err)
	}

	ret := &Game{
		Settings:    s,
		Room:        room,
		Users:       room.Users(),
		TotalScores: make(map[string]int64),
		Stage:       &pickSongStage{},
	}
	return ret, nil
}

func (g *Game) Run(events <-chan game.Event) {
	for {
		next, err := g.Stage.Run(g, events)
		if err != nil {
			log.Printf("Error encountered during the game: %v", err)
			return
		}
		if next == nil {
			return
		}
		g.Stage = next
	}
}

func (g *Game) fallback(ev game.Event) {
	switch ev := ev.(type) {
	case *game.NewChatMessage:
		g.Room.SendGameChat(ev, g.Users...)
	}
}

type stage interface {
	Run(*Game, <-chan game.Event) (stage, error)
}

type pickSongStage struct {
	*Game
	choices map[string]*UserSong
}

func (s *pickSongStage) Run(g *Game, events <-chan game.Event) (stage, error) {
	s.Game = g
	s.choices = make(map[string]*UserSong)
	// Resent game settings to all participants.
	g.Room.SendGameAction("settings", s.Settings, s.Users...)

	for ev := range events {
		if a, ok := ev.(*game.UserAction); ok {
			if next, ok := s.OnAction(a.User, a.Action, a.Payload); ok {
				return next, nil
			}
		} else {
			s.fallback(ev)
		}
	}
	return nil, errors.New("game ended unexpectedly")
}

func (s *pickSongStage) OnAction(user, action string, payload json.RawMessage) (stage, bool) {
	if action != "picked_song" {
		return nil, false
	}
	var song UserSong
	if err := json.Unmarshal(payload, &song); err != nil {
		log.Printf("Error parsing picked_song: %v. Raw: %s\n", err, string(payload))
		return nil, false
	}
	song.User = user
	s.choices[user] = &song
	if len(s.choices) >= len(s.Users) {
		s.End()
		return &waitReadyStage{Next: &roundStage{}}, true
	}
	return nil, false
}

func (s *pickSongStage) End() {
	// Resent everyone Rounds
	for _, song := range s.choices {
		s.Rounds = append(s.Rounds, song)
	}
	rand.Shuffle(len(s.Rounds), func(i, j int) {
		s.Rounds[i], s.Rounds[j] = s.Rounds[j], s.Rounds[i]
	})
	s.Room.SendGameAction("rounds", s.Rounds, s.Users...)
}

type waitReadyStage struct {
	Next stage
}

func (s *waitReadyStage) Run(g *Game, events <-chan game.Event) (stage, error) {
	pending := make(map[string]bool, len(g.Users))
	for _, user := range g.Users {
		pending[user] = true
	}
	for ev := range events {
		a, ok := ev.(*game.UserAction)
		if !ok {
			g.fallback(ev)
			continue
		}
		delete(pending, a.User)
		if len(pending) == 0 {
			return s.Next, nil
		}
		log.Printf("Room %q is still waiting for %d more players", g.Room.Name, len(pending))
	}
	return nil, errors.New("game ended unexpectedly")
}

type roundStage struct {
	*Game
	Round   *UserSong
	Start   time.Time
	Guessed map[string]int64 // user -> guessed in (milliseconds). 0 if gave up
}

func (s *roundStage) Run(g *Game, events <-chan game.Event) (stage, error) {
	s.Game = g
	s.Round = g.Rounds[g.RoundId]
	s.Guessed = map[string]int64{s.Round.User: 0}
	s.Start = time.Now()

	// Send "play" to everyone.
	g.Room.SendGameAction("play", nil, g.Users...)

	timeout := time.NewTimer(time.Second * time.Duration(s.Settings.TimeToGuess+5))
	defer timeout.Stop()

	for {
		select {
		case <-timeout.C:
			return s.End(), nil
		case ev, ok := <-events:
			if !ok {
				return nil, errors.New("game ended unexpectedly")
			}
			switch ev := ev.(type) {
			case *game.NewChatMessage:
				if next, ok := s.OnChat(ev); ok {
					return next, nil
				}
			case *game.UserAction:
				if ev.Action == "giveup" {
					if _, ok := s.Guessed[ev.User]; !ok {
						s.Guessed[ev.User] = 0
					}
					if len(s.Guessed) == len(s.Users) {
						return s.End(), nil
					}
				}
			}
		}
	}
}

func (s *roundStage) OnChat(m *game.NewChatMessage) (stage, bool) {
	if m.Text != s.Round.Want {
		s.Room.SendGameChat(m, s.Users...)
		return nil, false
	}
	if _, alreadyGuessed := s.Guessed[m.User]; alreadyGuessed || m.User == s.Round.User {
		msg := &game.NewChatMessage{User: "SYSTEM", Text: "Don't leak answers to the chat!", Created: m.Created}
		s.Room.SendGameChat(msg, s.Round.User)
		return nil, false
	}

	s.Guessed[m.User] = time.Since(s.Start).Milliseconds()
	msg := &game.NewChatMessage{User: "SYSTEM", Text: m.User + " guessed correctly!", Created: m.Created}
	s.Room.SendGameChat(msg, s.Users...)
	if len(s.Guessed) == len(s.Users) {
		return s.End(), true
	}
	return nil, false
}

func (s *roundStage) End() stage {
	s.RoundStats = append(s.RoundStats, s.Guessed)
	ret := make([]UserStat, 0, len(s.Users))
	for _, user := range s.Users {
		score := int64(s.Settings.TimeToGuess*10) - s.Guessed[user]/100
		if _, ok := s.Guessed[user]; !ok || score < 0 {
			score = 0
		}
		s.TotalScores[user] += score
		ret = append(ret, UserStat{
			User:       user,
			GuessedIn:  uint(s.Guessed[user]),
			RoundScore: uint(score),
			TotalScore: uint(s.TotalScores[user]),
		})
	}
	sort.Slice(ret, func(i, j int) bool {
		return ret[i].RoundScore > ret[j].RoundScore
	})
	s.Room.SendGameAction("round_end", Stats{ret}, s.Users...)
	s.RoundId++
	if s.RoundId >= len(s.Rounds) {
		s.Room.SendGameAction("game_over", nil, s.Users...)
		return nil
	}
	return &waitReadyStage{&roundStage{}}
}
