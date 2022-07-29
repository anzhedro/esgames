import { IGame } from "../utils/types";

const rules = () => {
  return <p>Угадай мелодию.</p>;
};

const game = () => {
  return <p>TODO: Implement SongQuiz</p>;
};

// "settings": {
//   "topic": "topic",
//   "timeToPick": [10, 20, 30, 40, 50, 60],
//   "timeToGuess": [10, 20, 30]
// }

export const Game: IGame = {
  gameId: "songquiz",
  title: "SongQuiz",
  image: "/img/song_heart.svg",
  rules,
  game,
};
