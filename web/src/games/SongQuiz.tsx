import { createSignal, For, Show } from "solid-js";
import { IGame } from "../utils/types";

const songQuizTopics = [
  "No theme",
  "Custom",
  "Lockdown",
  "Disney",
  "TV Shows",
  "Film Soundtracks",
  "Cartoon Themes",
  "Songs with a name in them",
  "Songs containing a place/city/country",
  "Colours",
  "Videogames",
  "80s",
  "90s",
  "00s",
  "Christmas",
  "Musicals",
  "Covers",
  "Songs where the name is never mentioned in the lyrics",
  "Songs in a different language",
  "Game Show Theme Songs",
  "Rap",
  "Classical music",
  "One-word artist names",
];

const [currentTopic, setCurrentTopic] = createSignal(songQuizTopics[0]);
const Topics = () => {
  return (
    <div>
      <h3>Тема игры</h3>
      <div>
        <select
          name="cellsWide"
          onChange={(e) => {
            console.log(e.currentTarget.value);
            setCurrentTopic(e.currentTarget.value);
          }}
        >
          <For each={songQuizTopics}>{topic => <option value={topic}>{topic}</option>}</For>
        </select>
        <Show when={currentTopic() === "Custom" || !songQuizTopics.includes(currentTopic())}>
          <input
            type="text"
            onKeyUp={(e) => {
              setCurrentTopic(" " + e.currentTarget.value);
            }}
          />
        </Show>
      </div>
    </div>
  );
};

const [timeToPick, setTimeToPick] = createSignal(60);
const [timeToGuess, setTimeToGuess] = createSignal(20);

const settings = () => {
  return (
    <>
      <div>
        <h3>Время на выбор песни</h3>
        <input type="number" value="60" min="0" max="120" onChange={e => setTimeToPick(+e.currentTarget.value)} />
      </div>
      <div>
        <h3>Время для ответа</h3>
        <input type="number" value="20" min="1" max="30" onChange={e => setTimeToGuess(+e.currentTarget.value)} />
      </div>
      <Topics />
    </>
  );
};

const rules = () => {
  return <p>Угадай мелодию.</p>;
};

const game = () => {
  return <p>TODO: Implement SongQuiz</p>;
};

// Kinds of messages we can send to the backend:
// * picked_song
// * ready
// * giveup

const actions = {
  settings(payload: any) { },
  rounds(payload: any) { },
  play(payload: any) { },
  round_end(payload: any) { },
  game_over(payload: any) { },
};

export const Game: IGame = {
  gameId: "songquiz",
  title: "SongQuiz",
  imageUrl: "/img/song_heart.svg",
  settingsEl: settings,
  rulesEl: rules,
  gameEl: game,
  getSettings: () => ({
    timeToPick: timeToPick(),
    timeToGuess: timeToGuess(),
    topic: currentTopic(),
  }),
  onGameAction: (action, payload) => actions[action as keyof typeof actions](payload),
};
