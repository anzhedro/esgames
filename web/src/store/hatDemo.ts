import { createSignal } from "solid-js";

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

type WordsProps = {
  word: string;
  state: number;
}[];

const [roundWords, setRoundWords] = createSignal<WordsProps>([]);
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

const skipWord = () => {
  nextWithStatus(0);
};

const acceptWord = () => {
  nextWithStatus(1);
};

export {
  textInButton,
  setTextInButton,
  roundWords,
  setRoundWords,
  startGame,
  timer,
  roundTime,
  skipWord,
  acceptWord,
  handleClick,
};
