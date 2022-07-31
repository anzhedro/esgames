import { IGame } from "../utils/types";

const rules = () => {
  return <p>Отгадай песню.</p>;
};

const game = () => {
  return <div></div>;
};

export const Game: IGame = {
  gameId: "guess_song",
  title: "Отгадай песню",
  imageUrl: "/img/song.svg",
  rulesEl: rules,
  gameEl: game,
  onGameAction() {},
};
