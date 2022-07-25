package hat

import "fmt"

type Difficulty uint8

const (
	Easy Difficulty = iota
	Medium
	Hard
)

func (d Difficulty) String() string {
	switch d {
	case Easy:
		return "easy"
	case Medium:
		return "medium"
	case Hard:
		return "hard"
	default:
		return "unknown"
	}
}

type Language string

const (
	En Language = "en"
	Ru Language = "ru"
)

type Settings struct {
	// TODO: Add spectators support
	Teams       [][]string `json:"teams"`
	TimePerTurn int        `json:"timePerTurn"` // seconds for one team's turn
	Difficulty  Difficulty `json:"difficulty"`
	Language    Language   `json:"language"`
	WordsInHat  int        `json:"wordsInHat"`
}

func (s *Settings) Validate() error {
	if len(s.Teams) == 0 {
		return fmt.Errorf("must have at least one team")
	}

	for i, team := range s.Teams {
		if len(team) < 1 {
			return fmt.Errorf("team %d must have at least one player", i)
		}
	}

	if s.TimePerTurn < 10 {
		return fmt.Errorf("timePerTurn must be at least 10 seconds")
	}

	if s.WordsInHat < 1 {
		return fmt.Errorf("wordsInHat must be at least 1")
	}

	dict := Dictionaries[s.Language]
	if dict == nil {
		return fmt.Errorf("language %s is not supported", s.Language)
	}

	if words := len(dict[s.Difficulty]); words < s.WordsInHat {
		return fmt.Errorf("not enough words in %q for difficulty %s (got %d, want %d)", s.Language, s.Difficulty, words, s.WordsInHat)
	}

	return nil
}
