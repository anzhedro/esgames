import { IGame } from '../utils/types';

const rules = () => <p>Рисуйте и отгадывайте.</p>;

const game = () => <div></div>;

export const Game: IGame = {
  gameId: 'crocodile',
  title: 'Crocodile',
  imageUrl: '/img/crocodile.svg',
  rulesEl: rules,
  gameEl: game,
  onGameAction() {},
};
