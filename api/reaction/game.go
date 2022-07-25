package reaction

import (
	"encoding/json"
	"log"
	"math/rand"
	"sync"
	"time"

	"github.com/anzhedro/esgames/api"
)

const Name = "reaction"

type Game struct {
	Room  *api.Room
	Users []string // sorted list of players

	endGame chan struct{}

	mu              sync.Mutex
	lastUserStarted time.Time
	curPlayer       int
}

func NewGame(room *api.Room, settings json.RawMessage) (api.Game, error) {
	ret := &Game{
		Room:    room,
		Users:   room.Users(),
		endGame: make(chan struct{}),
	}
	rand.Shuffle(len(ret.Users), func(i, j int) {
		ret.Users[i], ret.Users[j] = ret.Users[j], ret.Users[i]
	})
	return ret, nil
}

func (g *Game) Name() string {
	return Name
}

func (g *Game) Run() {
	g.mu.Lock()
	start := time.Now()
	g.lastUserStarted = start
	g.mu.Unlock()

	g.Room.GameToUser(g.Users[0], pressBtn{})
	<-g.endGame

	elapsed := time.Since(start).Seconds()
	for _, user := range g.Users {
		g.Room.GameToUser(user, gameOver{TotalTimeSec: elapsed})
	}
}

func (g *Game) State() json.RawMessage {
	return nil
}

func (g *Game) HandleAction(user string, action json.RawMessage) {
	g.mu.Lock()
	if wantUser := g.Users[g.curPlayer]; user != wantUser {
		g.mu.Unlock()

		log.Printf("Game expects %s to send answer, got %s", wantUser, user)
		return
	}

	g.curPlayer++
	start := g.lastUserStarted
	g.lastUserStarted = time.Now()
	if g.curPlayer >= len(g.Users) {
		g.mu.Unlock()

		g.Room.GameToUser(user, map[string]float64{"your_time_sec": time.Since(start).Seconds()})
		close(g.endGame)
		return
	}
	nextUser := g.Users[g.curPlayer]
	alreadyPressed := g.Users[g.curPlayer-1:]
	g.mu.Unlock()

	g.Room.GameToUser(user, map[string]float64{"your_time_sec": time.Since(start).Seconds()})
	g.Room.GameToUser(nextUser, pressBtn{AlreadyPressed: alreadyPressed})
}

type pressBtn struct {
	AlreadyPressed []string `json:"already_pressed"`
}

type gameOver struct {
	TotalTimeSec float64 `json:"total_time_sec"`
}
