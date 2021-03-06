package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/anzhedro/esgames/api/game"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

var (
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
)

type Server struct {
	Registry map[string]StartGameFn
	mu       sync.Mutex
	Rooms    map[string]*Room
}

type StartGameFn func(room *Room, setting json.RawMessage) (game.Game, error)

func NewServer(games map[string]StartGameFn) *Server {
	return &Server{
		Registry: games,
		Rooms:    make(map[string]*Room),
	}
}

func (s *Server) Handle(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer c.Close()

	if err := s.handleImpl(c); err != nil {
		log.Println(err.Error())
	}
}

func (s *Server) handleImpl(c *websocket.Conn) error {
	var login LoginReq
	if err := c.ReadJSON(&login); err != nil {
		return fmt.Errorf("failed to read login: %s", err)
	}
	log.Printf("Login: %#v\n", login)

	if login.Room == "" {
		login.Room = uuid.NewString()
	}

	s.mu.Lock()
	room := s.Rooms[login.Room]
	if room == nil {
		log.Printf("Creating room %q with host %q\n", login.Room, login.User)
		room = NewRoom(s.Registry, login.Room, login.User)
		s.Rooms[login.Room] = room
	}
	s.mu.Unlock()

	if err := room.Handle(c, &login); err != nil {
		return fmt.Errorf("user=%s room=%s: %w", login.User, login.Room, err)
	}
	return nil
}
