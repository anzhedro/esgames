import { createEffect, createSignal } from "solid-js";
import { connectToRoom } from "./socket";
import { loadUserInfo, saveUserInfo } from "./localstorage";
import { randomInteger } from "../utils/helpers";
import { users } from "./room";

const savedUserInfo = loadUserInfo() || { name: "", avatar: randomInteger(1, 25), lastRoom: "" };
export const [avatar, setAvatar] = createSignal(savedUserInfo.avatar);
export const setRandomAvatar = () => { setAvatar(randomInteger(1, 25)); };
export const [name, setName] = createSignal(savedUserInfo.name);
export const [room, setRoom] = createSignal(savedUserInfo.lastRoom);

const [iAmHost, setIAmHost] = createSignal(false);
createEffect(() => {
  setIAmHost(users().find(user => user.name === name())?.is_host === true);
});

// Possible states:
// * "start" - ws is not connected. user sees the login form.
// * "connecting" - user clicked "Join" on the login form. We started a websocket but haven't 
//                  received the "login_success" yet.
// * "connected" - ws is connected and we received the "login_success" message. User sees the Room.
type State = "start" | "connecting" | "connected";

export const [appState, setAppState] = createSignal<State>("start");

export function login() {
  saveUserInfo({ name: name(), avatar: avatar(), lastRoom: room() });
  connectToRoom(name(), room(), avatar());
};

export { iAmHost };
