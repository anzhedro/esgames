import { createSignal } from 'solid-js';
import { IPlayer, IGame } from '../utils/types';
import { socket } from './socket';
import { appState } from './state';


type GameState = {
  state: 'lobby';
} | {
  state: 'pregame';
  game: IGame;
} | {
  state: 'playing';
  game: IGame;
};

export function getGame(s: GameState): IGame | undefined {
  return s.state === 'lobby' ? undefined : s.game;
}

export const [users, setUsers] = createSignal<IPlayer[]>([]);
export const [currentGame, setCurrentGame] = createSignal<GameState>({ state: 'lobby' });
export const [showButton, setShowButton] = createSignal(false);

export function startGame() {
  const cur = currentGame();
  if (cur.state === 'lobby') {
    return;
  }
  const game = cur.game;
  socket()!.send(
    JSON.stringify({
      type: 'start_game',
      game: game.gameId,
      settings: game.getSettings ? game.getSettings() : undefined,
    })
  );
}

export function send(text: string) {
  socket()!.send(JSON.stringify({ type: 'chat', text }));
}

export function sendGameAction(action: string, payload?: Record<string, unknown> | Array<unknown>) {
  socket()!.send(
    JSON.stringify({
      type: 'game_action',
      action,
      payload,
    })
  );
}

export function handleKick(user: string) {
  if (appState() !== 'connected') return;
  socket()!.send(JSON.stringify({ type: 'kick_user', user }));
}
