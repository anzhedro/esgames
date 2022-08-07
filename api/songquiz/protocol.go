package songquiz

import "fmt"

/*
Game starts: BE recieves { type: "game_start", settings: {...} }}
BE -> FE: Room update with Game's name
BE -> FE: Resend settings to everyone
	* { type: "game_action", action: "settings", payload: Settings{} }
FE should show everyone a screen to pick a song for settings.TimeToPick seconds.
	When picked -> send to BE: { type: "game_action", action: "picked_song", payload: UserSong{} }
	If not picked in time -> send to BE: { type: "game_action", action: "pick_time_out" }
BE waits for everyone's UserSong.
BE resend everyone a Rounds:
  * { type: "game_action", action: "rounds", payload: [UserSong{...}, UserSong{}] }

for each Round in Rounds:
  FE preloads the audio for the current step and when done sends
		* { type: "game_action", action: "ready" }
	When BE got ready for everyone -> broadcast
		* { type: "game_action", action: "play" }

	FE:
		- play the current song for TimeToGuess. Chat works as usual.
		FE handles events:
		- { type: "game_action", action: "round_end", payload: Stats{} } // when everyone guessed or time is up
			-> move to stats screen and start preloading the next round. continue
		- local TimeToGuess is over -> FE sends { type: "game_action", action: "giveup" }
			-> wait for "round_end" event

	BE handles events:
		- Game intercepts chat messages and checks if the user guessed correctly.
  		- If incorrect - broadcast it to the chat
			-	If correct - broadcast (user guessed correctly) to the chat
		- FE sends BE { type: "game_action", action: "giveup" }
		- Timer for timeToGuess+5s
	- If everyone guessed, or everyone's music stopped playing, or timeToGuess+5s passed:
		- Broadcast Stats so far: { type: "game_action", action: "round_end", payload: Stats{} }
		- continue

BE sends { type: "game_action", action: "game_over" }


BE: nil     -> FE: lobby=nil || browsing pre-game = game_id+(rules|settings)
BE: game_id -> FE: game

state1: nil (lobby)
state2: game_id + rules
state3: game_id + settings
state4: game_id started

const [currentGame, setCurrentGame] = createState<null | game_rules | game_settings | game>(null);
*/

type Settings struct {
	Topic       string `json:"topic"`
	TimeToPick  uint   `json:"timeToPick,omitempty"`  // in seconds; default is 60 seconds
	TimeToGuess uint   `json:"timeToGuess,omitempty"` // in seconds; default is 15 seconds
}

func (s *Settings) Validate() error {
	if s.Topic == "" {
		return fmt.Errorf("topic must be set")
	}
	if s.TimeToPick == 0 {
		s.TimeToPick = 60
	}
	if s.TimeToGuess == 0 {
		s.TimeToGuess = 15
	}
	return nil
}

type UserSong struct {
	User string `json:"user,omitempty"` // set only when BE returns songs for the round

	Want   string `json:"want"`
	Pic    string `json:"pic"`   // url
	Audio  string `json:"audio"` // url
	Track  string `json:"track"`
	Artist string `json:"artist"`
}

type Stats struct {
	Users []UserStat `json:"users"`
}

type UserStat struct {
	User       string `json:"user"`
	GuessedIn  uint   `json:"guessedIn,omitempty"` // guessed in this amount of millisec; only set if guessed
	RoundScore uint   `json:"roundScore"`
	TotalScore uint   `json:"totalScore"`
}
