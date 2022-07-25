package main

import (
	"log"
	"net/http"

	"github.com/anzhedro/esgames/api"
	"github.com/anzhedro/esgames/api/reaction"
)

func main() {
	games := map[string]api.StartGameFn{
		reaction.Name: reaction.NewGame,
	}
	srv := api.NewServer(games)
	http.HandleFunc("/ws", srv.Handle)
	log.Println("Starting server on :8000")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
