import { IGame } from "../utils/types";

const rules = () => {
  return <p>Рисуйте и отгадывайте.</p>;
};

const game = () => {
  return <div></div>;
};

export const Game: IGame = {
  gameId: "crocodile",
  title: "Crocodile",
  image: "/img/crocodile.svg",
  rules,
  game,
};
