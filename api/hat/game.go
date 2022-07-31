package hat

import (
	"encoding/json"
	"fmt"
	"math/rand"

	"github.com/anzhedro/esgames/api"
	"github.com/anzhedro/esgames/api/game"
)

const Name = "hat"

type Game struct {
	Settings
	Room  *api.Room
	Words []string // words in hat
}

func NewGame(room *api.Room, settings json.RawMessage) (game.Game, error) {
	var s Settings
	if err := json.Unmarshal(settings, &s); err != nil {
		return nil, fmt.Errorf("failed to parse settings: %v. Raw: %s", err, string(settings))
	}
	if err := s.Validate(); err != nil {
		return nil, fmt.Errorf("invalid settings: %v", err)
	}

	dict := Dictionaries[s.Language][s.Difficulty]
	words := make([]string, 0, s.WordsInHat)
	for _, idx := range rand.Perm(len(dict))[:s.WordsInHat] {
		words = append(words, dict[idx])
	}

	// Shuffle people within each team
	for _, team := range s.Teams {
		rand.Shuffle(len(team), func(i, j int) { team[i], team[j] = team[j], team[i] })
	}

	ret := &Game{
		Settings: s,
		Room:     room,
		Words:    words,
	}
	return ret, nil
}

func (g *Game) Run(events <-chan game.Event) {
	for ev := range events {
		switch ev := ev.(type) {
		case *game.UserAction:
			fmt.Printf("HAT: %v: %v\n", ev.User, ev.Action)
		}
	}
}

type state struct {
	Round int
	Team  int
}

// 1 2 3 1 2 3
// Team 1: a b c -> shuffle
/*
Game starts: ->
broadcast: { kind: "game_start", settings: {}} }
// TODO: Everyone clicks "start" ...
broadcast: { kind: "next_turn", team: 0, player: 0, wordsInHat: 100 } }
..
client (player 0) -> server: {kind:"start_turn"}
broadcast: { turn_started: { team: 0 player 0 } }
->client (player 0): {kind: "next_word", word: "word"}

... // client clicks "yes"/"no" and the client wants another word
client (player 0) -> server: {kind: "answer", guessed: true}
->client (player 0): {kind: "next_word", word: "word"} // if there are no more words
broadcast: {kind: "answer", guessed: true}

.. // timer runs out or no more words in hat
client (player 0) -> server: { kind: "turn_ended", last_word_guessed: true, remove_words: ["bad", "used"] }
broadcast: { kind: "next_turn", team: 1, player: 0, wordsInHat: 90 } }
...

// No more words in hat after "turn_ended" is processed by the server
broadcast: { kind: "game_over", teams: [1, 20, 10] } }

// TODO: Host should send "end game".

*/
