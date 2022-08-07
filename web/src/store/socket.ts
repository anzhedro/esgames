import { createSignal } from 'solid-js';
import { setAppState, setRoom } from './state';
import { addMessages } from './chat';
import { setCurrentGame, setUsers, currentGame } from './room';
import { byName } from '../games/games';
import { IMessage, IPlayer } from '../utils/types';

const [socket, setSocket] = createSignal<WebSocket | null>(null);

export function connectToRoom(user: string, room: string, avatar: number) {
  setAppState('connecting');
  const host = localStorage.getItem('host') ?? window.location.host;
  const soc = new WebSocket(`ws://${host}/ws`);
  setSocket(soc);

  soc.onclose = (event) => {
    console.log('ws CLOSE', event);
    // Reconnect only if we are supposed to have an open socket.
    if (socket() !== null) {
      setSocket(null);
      setTimeout(() => {
        connectToRoom(user, room, avatar);
      }, 1000);
    }
  };

  soc.onopen = (event) => {
    console.log('ws OPEN', event);
    soc.send(
      JSON.stringify({
        type: 'login',
        user,
        room,
        avatar,
      })
    );
  };

  soc.onerror = (event) => {
    console.log('ws ERR', event);
  };

  soc.onmessage = (event) => {
    const m = JSON.parse(event.data) as messageType;
    console.log('ws GOT: ', m);
    switch (m.type) {
      case 'login_success':
        setRoom(m.room);
        setAppState('connected');
        return;
      case 'login_fail':
        setSocket(null);
        setAppState('start');
        return;
      case 'chat':
        addMessages(m.messages);
        return;
      case 'room':
        setUsers(m.users);
        const cur = currentGame();
        if (!m.game) {
          if (cur.state === 'playing') {
            setCurrentGame({ state: 'lobby' });
          }
          return;
        }
        // BE thinks we are playing a game.
        if (cur.state === 'playing' && cur.game.gameId === m.game) {
          return;
        }
        setCurrentGame({ state: 'playing', game: byName(m.game)! });
        return;
      case 'game_action': {
        const { action, payload } = m;
        const cur = currentGame();
        if (cur.state === 'playing') {
          cur.game.onGameAction(action, payload);
        }
        return;
      }
      case 'kick_user':
        alert(m.reason);
        setSocket(null);
        setAppState('start');
        break;
      default:
    }
  };
}

type messageType = {
  type: 'login_success';
  room: string;
} | {
  type: 'login_fail';
  reason: string;
} | {
  type: 'chat';
  messages: IMessage[];
} | {
  type: 'room';
  users: IPlayer[];
  game: string;
} | {
  type: 'game_action';
  action: string;
  payload?: unknown;
} | {
  type: 'kick_user';
  reason: string;
}

export { socket };
