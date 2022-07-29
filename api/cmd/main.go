package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/anzhedro/esgames/api"
	"github.com/anzhedro/esgames/api/hat"
	"github.com/anzhedro/esgames/api/reaction"
	"github.com/anzhedro/esgames/api/songquiz"
)

var (
	port = flag.Int("port", 8000, "port to listen on")
)

func main() {
	flag.Parse()

	games := map[string]api.StartGameFn{
		reaction.Name: reaction.NewGame,
		hat.Name:      hat.NewGame,
		songquiz.Name: songquiz.NewGame,
	}
	srv := api.NewServer(games)
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("dist/assets"))))
	http.Handle("/img/", http.StripPrefix("/img/", http.FileServer(http.Dir("dist/img"))))
	http.HandleFunc("/ws", srv.Handle)
	// Handle all other paths by serving the index.html file.
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "dist/index.html")
	})
	log.Printf("Starting server on :%d\n", *port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", *port), nil))
}
