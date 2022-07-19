package main

import (
	"log"
	"net/http"

	"github.com/anzhedro/esgames/api"
)

func main() {
	srv := api.NewServer()
	http.HandleFunc("/ws", srv.Handle)
	log.Println("Starting server on :8000")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
