import { IGame } from "../utils/types";

const rules = () => {
  return <p>Придумывайте слова на букву.</p>;
};

const game = () => {
  return <div></div>;
};

export const Game: IGame = {
  gameId: "boring_game",
  title: "Boring game",
  imageUrl: "/img/zzz.svg",
  rulesEl: rules,
  gameEl: game,
  onGameAction() {},
};
