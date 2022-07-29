import { IGame } from "../utils/types";

const rules = () => {
  return <p>Vladilen! Vladilen!</p>;
};

const game = () => {
  return <div></div>;
};

export const Game: IGame = {
  gameId: "Vladilen",
  title: "Vladilen",
  image: "/img/vladilen.svg",
  rules,
  game,
};
