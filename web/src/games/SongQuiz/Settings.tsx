import { For, Show } from 'solid-js';
import { setTimeToPick, setTimeToGuess, currentTopic, setCurrentTopic } from './store';

const songQuizTopics = [
  'No theme',
  'Custom',
  'Lockdown',
  'Disney',
  'TV Shows',
  'Film Soundtracks',
  'Cartoon Themes',
  'Songs with a name in them',
  'Songs containing a place/city/country',
  'Colours',
  'Videogames',
  '80s',
  '90s',
  '00s',
  'Christmas',
  'Musicals',
  'Covers',
  'Songs where the name is never mentioned in the lyrics',
  'Songs in a different language',
  'Game Show Theme Songs',
  'Rap',
  'Classical music',
  'One-word artist names',
];

export const Topics = () => (
  <div>
    <h3>Тема игры</h3>
    <div>
      <select name="cellsWide" onChange={(e) => setCurrentTopic(e.currentTarget.value)}>
        <For each={songQuizTopics}>{(topic) => <option value={topic}>{topic}</option>}</For>
      </select>
      <Show when={currentTopic() === 'Custom' || !songQuizTopics.includes(currentTopic())}>
        <input type="text" onKeyUp={(e) => setCurrentTopic(` ${e.currentTarget.value}`)} />
      </Show>
    </div>
  </div>
);

export const Settings = () => (
  <div class="quiz_game_settings">
    <div>
      <h3>Время на выбор песни</h3>
      <input type="number" value="60" min="0" max="120" onChange={(e) => setTimeToPick(+e.currentTarget.value)} />
    </div>
    <div>
      <h3>Время для ответа</h3>
      <input type="number" value="20" min="1" max="30" onChange={(e) => setTimeToGuess(+e.currentTarget.value)} />
    </div>
    <Topics />
  </div>
);
