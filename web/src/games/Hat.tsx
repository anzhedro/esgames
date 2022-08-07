import { createSignal, createEffect, Show, For } from 'solid-js';
import { WordItem, WordsList } from '../pages/ComponentsPage';
import { IGame } from '../utils/types';

const settings = () => (
  <>
    <RoundTime />
    <RoundCount />
    <Difficulty />
  </>
);

const rules = () => (
  <>
    <h2>Правила игры Hat</h2>
    <p>Игроки по очереди объясняют друг другу слова, за каждое угаданное слово получает очки.</p>
    <p>Команда набравшая больше очков побеждает</p>
  </>
);

const game = () => {
  const lastWordRef = null;

  createEffect(() => {
    setTimeout(() => {
      setTextInButton('Старт');
    }, 1000);
  });

  // const scrollToEnd = () => {
  //   if (roundWords().length === 0) return;
  //   lastWordRef.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'end',
  //   });
  // };

  return (
    <div class="demo_hat">
      <div class="central_column">
        <WordsList>
          <For each={roundWords()}>
            {(word: WordsProp, index) => (
              <WordItem
                ref={lastWordRef}
                canEdit={false}
                countInit={word.state}
                color="green"
                text={word.word}
                isShowSkip={index() === roundWords().length - 1}
              />
            )}
          </For>
        </WordsList>

        <Show when={timer() !== roundTime()}>
          <div class="timer">{timer()}</div>
        </Show>

        <div>
          <button class="green_btn" onclick={handleClick}>
            {textInButton()}
          </button>
        </div>
      </div>
    </div>
  );
};

const [textInButton, setTextInButton] = createSignal('Ждите');

const words = [
  'Владилен',
  'React',
  'Vue',
  'Solidjs',
  'Angular',
  'jQuery',
  'Владилен',
  'React',
  'Vue',
  'Solidjs',
  'Angular',
  'jQuery',
  'Владилен',
  'React',
  'Vue',
  'Solidjs',
  'Angular',
  'jQuery',
  'Владилен',
  'React',
  'Vue',
  'Solidjs',
  'Angular',
  'jQuery',
  'Владилен',
  'React',
  'Vue',
  'Solidjs',
  'Angular',
  'jQuery',
];

type WordsProp = {
  word: string;
  state: number;
};

const [roundWords, setRoundWords] = createSignal<Array<WordsProp>>([]);
const [wordsCounter, setWordsCounter] = createSignal(0);
const [roundTime] = createSignal(5);
const [timer, setTimer] = createSignal(roundTime());

const handleClick = () => {
  if (textInButton() === 'Ждите') {
    return;
  }

  switch (textInButton()) {
    case 'Старт':
      startGame();
      break;
    case 'Следующее слово':
      acceptWord();
      break;
    case 'Команда 2':
      startGame();
      break;
    default:
  }
};

const startGame = () => {
  const newArr = [{ word: words[wordsCounter()], state: 0 }];
  setRoundWords(newArr);
  setWordsCounter(wordsCounter() + 1);
  setTextInButton('Следующее слово');
  setTimer(timer() - 1);
  const t = setInterval(() => {
    if (timer() > 0) {
      setTimer(timer() - 1);
    } else {
      clearInterval(t);
      setTextInButton('Команда 2');
      setTimer(roundTime());
    }
  }, 1000);
};

const nextWordWithStatus = (status: number) => {
  const newArr = roundWords().slice(0, -1);
  newArr.push({
    word: roundWords()[roundWords().length - 1].word,
    state: status,
  });
  newArr.push({ word: words[wordsCounter()], state: 0 });
  setRoundWords(newArr);
  setWordsCounter(wordsCounter() + 1);
};

export const skipWord = () => {
  nextWordWithStatus(0);
};

const acceptWord = () => {
  nextWordWithStatus(1);
};

export const Game: IGame = {
  gameId: 'hat',
  title: 'Hat',
  imageUrl: '/img/hat.svg',
  settingsEl: settings,
  rulesEl: rules,
  gameEl: game,
  onGameAction: () => {},
};

const difficultyOptions = ['Легко', 'Средне', 'Сложно'];
const [currentDifficulty, setCurrentDifficulty] = createSignal(difficultyOptions[0]);
const [roundsCount, setRoundsCount] = createSignal(3);

const roundsCountIncrement = () => {
  if (roundsCount() < 100) {
    setRoundsCount(roundsCount() + 1);
  }
};

const roundsCountDecrement = () => {
  if (roundsCount() > 1) {
    setRoundsCount(roundsCount() - 1);
  }
};

export const RoundTime = () => (
  <div>
    <h3>Время раунда</h3>
    <input type="number" />
  </div>
);

export const RoundCount = () => (
  <div class="round_count">
    <h3>Количество раундов</h3>
    <div class="row">
      <button onclick={roundsCountIncrement}>+</button>
      <button onclick={roundsCountDecrement}>-</button>
      <p>{roundsCount()}</p>
    </div>
  </div>
);

export const Difficulty = () => {
  const [isSelectOpen, setIsSelectOpen] = createSignal(false);

  return (
    <div>
      <h3>Сложность</h3>
      <div class="select">
        <div class="currentOption option" onclick={() => setIsSelectOpen(!isSelectOpen())}>
          {currentDifficulty()}
        </div>

        <div class="options">
          <Show when={isSelectOpen()}>
            <For each={difficultyOptions}>
              {(option) => (
                <div
                  onclick={() => {
                    setCurrentDifficulty(option);
                    setIsSelectOpen(false);
                  }}
                  class="option"
                >
                  {option}
                </div>
              )}
            </For>
          </Show>
        </div>
      </div>
    </div>
  );
};

export const TeamsCount = () => {};
//  const [currentCount, setCurrentCount] = createSignal(selectedGameSettings().teamsCount);
//   (
//     <div class="commands_count">
//       <h3>Количество команд</h3>
//       { <div class="row">
//         <For each={currentGame()!.settings!.teamsCount} fallback={<div>Loading...</div>}>
//           {(count) => (
//             <button classList={{ active: currentCount() === count }}
//               onClick={() => setCurrentCount(count)}>
//               {count}
//             </button>
//           )}
//         </For>
//       </div> }
//     </div>
//   );
