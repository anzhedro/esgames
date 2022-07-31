import { createEffect, createRoot, createSignal } from 'solid-js';
import { connectToRoom, socket } from './socket';
import { setMessages } from './chat';
import { loadUserInfo, saveUserInfo } from './localstorage';
import { randomInteger } from '../utils/helpers';
import { users } from './room';

const savedUserInfo = loadUserInfo() || { name: '', avatar: randomInteger(1, 25), lastRoom: '' };
export const [avatar, setAvatar] = createSignal(savedUserInfo.avatar);
export const setRandomAvatar = () => {
  setAvatar(randomInteger(1, 25));
};
export const [name, setName] = createSignal(savedUserInfo.name);
export const [room, setRoom] = createSignal(savedUserInfo.lastRoom);

export const [iAmHost, setIAmHost] = createSignal(false);

// https://github.com/solidjs/solid/issues/242#issuecomment-709717468
createRoot(() => {
  createEffect(() => {
    setIAmHost(users().find((user) => user.name === name())?.is_host === true);
  });
  createEffect(() => {
    if (socket() === null) {
      setMessages([]);
    }
  });
});

// Possible states:
// * "start" - ws is not connected. user sees the login form.
// * "connecting" - user clicked "Join" on the login form. We started a websocket but haven't
//                  received the "login_success" yet.
// * "connected" - ws is connected and we received the "login_success" message. User sees the Room.
type UserState = 'start' | 'connecting' | 'connected';

export const [appState, setAppState] = createSignal<UserState>('start');

export function login() {
  saveUserInfo({ name: name(), avatar: avatar(), lastRoom: room() });
  connectToRoom(name(), room(), avatar());
}
