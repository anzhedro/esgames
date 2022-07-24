package main

import (
	"log"
	"net/http"

	"github.com/anzhedro/esgames/api"
	"github.com/anzhedro/esgames/api/hat"
)

func main() {
	games := map[string]api.StartGameFn{
		hat.Name: hat.NewGame,
	}
	srv := api.NewServer(games)
	http.HandleFunc("/ws", srv.Handle)
	log.Println("Starting server on :8000")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
