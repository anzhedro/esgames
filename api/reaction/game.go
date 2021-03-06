package reaction

import (
	"encoding/json"
	"log"
	"math/rand"
	"time"

	"github.com/anzhedro/esgames/api"
	"github.com/anzhedro/esgames/api/game"
)

const Name = "reaction"

type Game struct {
	Room  *api.Room
	Users []string // sorted list of players

	lastUserStarted time.Time
	curPlayer       int
}

func NewGame(room *api.Room, settings json.RawMessage) (game.Game, error) {
	ret := &Game{
		Room:  room,
		Users: room.Users(),
	}
	rand.Shuffle(len(ret.Users), func(i, j int) {
		ret.Users[i], ret.Users[j] = ret.Users[j], ret.Users[i]
	})
	return ret, nil
}

func (g *Game) Run(events <-chan game.Event) {
	start := time.Now()
	var curPlayer int
	g.Room.SendGameAction("press_btn", nil, g.Users[curPlayer]) // let the first player start the game
	g.lastUserStarted = start

	defer func() {
		elapsed := time.Since(start).Seconds()
		// Send results to all users.
		for _, user := range g.Users {
			g.Room.SendGameAction("game_over", elapsed, user)
		}
	}()

	for ev := range events {
		switch ev := ev.(type) {
		case *game.UserAction:
			if !g.onAction(ev.User) {
				return
			}
		}
	}
}

// Returns false if the game should end.
func (g *Game) onAction(user string) bool {
	if wantUser := g.Users[g.curPlayer]; user != wantUser {
		log.Printf("Game expects %s to send answer, got %s", wantUser, user)
		return true
	}

	g.curPlayer++
	start := g.lastUserStarted
	g.lastUserStarted = time.Now()
	if g.curPlayer >= len(g.Users) {
		g.Room.SendGameAction("your_time_sec", time.Since(start).Seconds(), user)
		return false
	}
	nextUser := g.Users[g.curPlayer]
	alreadyPressed := g.Users[g.curPlayer-1:]

	g.Room.SendGameAction("your_time_sec", time.Since(start).Seconds(), user)
	g.Room.SendGameAction("press_btn", alreadyPressed, nextUser)
	return true
}
