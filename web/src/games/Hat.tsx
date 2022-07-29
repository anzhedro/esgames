import { createSignal, createEffect, Show, For, JSXElement } from "solid-js";
import { Difficulty, RoundCount, RoundTime, TeamsCount } from "../components/GameSettings";
import { WordItem, WordsList } from "../pages/ComponentsPage";
import { IGame } from "../utils/types";

const settings = () => {
  return (
    <>
      <RoundTime />
      <RoundCount />
      <Difficulty />
      <TeamsCount />
    </>
  );
};

const rules = () => {
  return (
    <>
      <h2>Правила игры Hat</h2>
      <p>Игроки по очереди объясняют друг другу слова, за каждое угаданное слово получает очки.</p>
      <p>Команда набравшая больше очков побеждает</p>
    </>
  );
};

const game = () => {
  let lastWordRef: any = null;

  createEffect(() => {
    setTimeout(() => {
      setTextInButton("Старт");
    }, 1000);
  });

  const scrollToEnd = () => {
    if (roundWords().length === 0) return;
    lastWordRef.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

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
                isShowSkip={index() == roundWords().length - 1}
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

const [textInButton, setTextInButton] = createSignal("Ждите");

const words = [
  "Владилен",
  "React",
  "Vue",
  "Solidjs",
  "Angular",
  "jQuery",
  "Владилен",
  "React",
  "Vue",
  "Solidjs",
  "Angular",
  "jQuery",
  "Владилен",
  "React",
  "Vue",
  "Solidjs",
  "Angular",
  "jQuery",
  "Владилен",
  "React",
  "Vue",
  "Solidjs",
  "Angular",
  "jQuery",
  "Владилен",
  "React",
  "Vue",
  "Solidjs",
  "Angular",
  "jQuery",
];

type WordsProp = {
  word: string;
  state: number;
};

const [roundWords, setRoundWords] = createSignal<Array<WordsProp>>([]);
const [wordsCounter, setWordsCounter] = createSignal(0);
const [roundTime, setRoundTime] = createSignal(5);
const [timer, setTimer] = createSignal(roundTime());

const initWord = {
  word: words[0],
  state: 0,
};

const greenButtonWords = ["Ждите", "Старт", "Следующее слово", "Команда 2", "Следующее слово"];

const handleClick = () => {
  if (textInButton() == "Ждите") {
    return;
  }

  switch (textInButton()) {
    case "Старт":
      startGame();
      break;
    case "Следующее слово":
      acceptWord();
      break;
    case "Команда 2":
      startGame();
      break;
  }

  // timer() === roundTime() ? startGame() : acceptWord();
};

const startGame = () => {
  const newArr = [{ word: words[wordsCounter()], state: 0 }];
  setRoundWords(newArr);
  setWordsCounter(wordsCounter() + 1);
  setTextInButton("Следующее слово");
  setTimer(timer() - 1);
  const t = setInterval(() => {
    if (timer() > 0) {
      setTimer(timer() - 1);
    } else {
      clearInterval(t);
      setTextInButton("Команда 2");
      setTimer(roundTime());
    }
  }, 1000);
};

const nextWithStatus = (status: number) => {
  let newArr = roundWords().slice(0, -1); // Удаляем последний элемент массива
  newArr.push({ word: roundWords()[roundWords().length - 1].word, state: status }); // Добавляем в конец массива новый элемент
  newArr.push({ word: words[wordsCounter()], state: 0 });
  setRoundWords(newArr);
  setWordsCounter(wordsCounter() + 1);
};

export const skipWord = () => {
  nextWithStatus(0);
};

const acceptWord = () => {
  nextWithStatus(1);
};

export const Game: IGame = {
  gameId: "hat",
  title: "Hat",
  image: "/img/hat.svg",
  settings,
  rules,
  game,
};
