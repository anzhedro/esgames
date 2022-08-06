import { For, onMount, Show } from 'solid-js';
import { startGameDisabled, setStartGameDisabled } from '../../components/GameSettings';
import { setTimeToPick, setTimeToGuess, currentTopic, setCurrentTopic } from './store';

const songQuizTopics = [
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

export const Topics = () => {
  // eslint-disable-next-line prefer-const

  const handleType = (e: KeyboardEvent) => {
    const input = e.target as HTMLInputElement;
    if (input.value.length > 25) {
      setStartGameDisabled(true);
      input.style.color = 'red';
      return;
    }
    input.style.color = 'black';
    setStartGameDisabled(false);
    setCurrentTopic(` ${input.value}`);
  };

  onMount(() => {});

  return (
    <div class="topics">
      <h3>Тема игры</h3>
      <div>
        <select name="cellsWide" onChange={(e) => setCurrentTopic(e.currentTarget.value)}>
          <For each={songQuizTopics}>
            {(topic) => (
              <option selected={currentTopic() === topic} value={topic}>
                {topic}
              </option>
            )}
          </For>
        </select>
        <Show when={currentTopic() === 'Custom' || !songQuizTopics.includes(currentTopic())}>
          <input type="text" onKeyUp={(e) => handleType(e)} class="customTopic" />
        </Show>
        <Show when={startGameDisabled()}>
          <p>*custom topic max length: 25</p>
        </Show>
      </div>
    </div>
  );
};

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
