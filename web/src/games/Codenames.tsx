import { IGame } from '../utils/types';

const rules = () => <p>Кодовые имена.</p>;

const game = () => <div></div>;

export const Game: IGame = {
  gameId: 'codenames',
  title: 'Codenames',
  imageUrl: '/img/codenames.svg',
  rulesEl: rules,
  gameEl: game,
  onGameAction() {},
};
