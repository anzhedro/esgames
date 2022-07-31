import { IGame } from '../utils/types';

const rules = () => <p>Отгадай песню.</p>;

const game = () => <div></div>;

export const Game: IGame = {
  gameId: 'guess_song',
  title: 'Отгадай песню',
  imageUrl: '/img/song.svg',
  rulesEl: rules,
  gameEl: game,
  onGameAction() {},
};
