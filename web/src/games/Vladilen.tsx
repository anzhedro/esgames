import { IGame } from '../utils/types';

const rules = () => <p>Vladilen! Vladilen!</p>;

const game = () => <div></div>;

export const Game: IGame = {
  gameId: 'Vladilen',
  title: 'Vladilen',
  imageUrl: '/img/vladilen.svg',
  rulesEl: rules,
  gameEl: game,
  onGameAction: () => {},
};
