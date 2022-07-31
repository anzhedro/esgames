import { createSignal } from 'solid-js';
import { setAppState, setRoom } from './state';
import { addMessages } from './chat';
import { setCurrentGame, setTableState, setUsers, currentGame } from './room';
import { byName } from '../games/games';
import { IMessage, IPlayer } from '../utils/types';

interface wsMessage extends gameActionMessage {
  type: string;
  room: string;
  messages: IMessage[];
  users: IPlayer[];
  game: string;
  reason: string;
}

interface gameActionMessage {
  action: string;
  payload?: unknown;
}

const [socket, setSocket] = createSignal<WebSocket | null>(null);

export function connectToRoom(user: string, room: string, avatar: number) {
  setAppState('connecting');
  const soc = new WebSocket(`ws://${window.location.host}/ws`);
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
    const response = JSON.parse(event.data) as wsMessage;
    console.log('ws GOT: ', response);
    switch (response.type) {
      case 'login_success':
        setRoom(response.room);
        setAppState('connected');
        return;
      case 'login_fail':
        setSocket(null);
        setAppState('start');
        return;
      case 'chat':
        addMessages(response.messages);
        return;
      case 'room':
        setUsers(response.users);
        if (response.game) {
          setCurrentGame(byName(response.game));
          setTableState('game_play');
        } else {
          setTableState('game_select');
        }
        return;
      case 'game_action': {
        const { action, payload } = response as gameActionMessage;
        currentGame()!.onGameAction(action, payload);
        return;
      }
      case 'kick_user':
        alert(response.reason);
        setSocket(null);
        setAppState('start');
        break;
      default:
    }
  };
}

export { socket };
