package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/anzhedro/esgames/api"
	"github.com/anzhedro/esgames/api/hat"
	"github.com/anzhedro/esgames/api/reaction"
)

var (
	port = flag.Int("port", 8000, "port to listen on")
)

func main() {
	flag.Parse()

	games := map[string]api.StartGameFn{
		reaction.Name: reaction.NewGame,
		hat.Name:      hat.NewGame,
	}
	srv := api.NewServer(games)
	http.Handle("/", http.FileServer(http.Dir("dist")))
	http.HandleFunc("/ws", srv.Handle)
	log.Printf("Starting server on :%d\n", *port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", *port), nil))
}
