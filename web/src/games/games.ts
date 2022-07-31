import { Game as Hat } from './Hat';
import { Game as Reaction } from './Reaction';
import { Game as SongQuiz } from './SongQuiz';
import { Game as Crocodile } from './Crocodile';
import { Game as GuessSong } from './GuessSong';
import { Game as BoringGame } from './BoringGame';
import { Game as Vladilen } from './Vladilen';

export const Games = [
  Hat,
  Reaction,
  SongQuiz,
  Crocodile,
  GuessSong,
  BoringGame,
  Vladilen,
];
export const byName = (gameId: string) =>
  Games.find((x) => x.gameId === gameId);
