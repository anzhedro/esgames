package api

import (
	"fmt"
	"log"
	"net/http"
	"sync"

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
	mu    sync.Mutex
	Rooms map[string]*Room
}

func NewServer() *Server {
	return &Server{
		Rooms: make(map[string]*Room),
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
		c.WriteJSON(jsonError("room name must not be empty"))
		return fmt.Errorf("room name is empty")
	}

	s.mu.Lock()
	room := s.Rooms[login.Room]
	if room == nil {
		room = NewRoom(login.Room)
		s.Rooms[login.Room] = room
	}
	s.mu.Unlock()

	if err := room.Handle(c, &login); err != nil {
		return fmt.Errorf("user=%s room=%s: %w", login.User, login.Room, err)
	}
	return nil
}
