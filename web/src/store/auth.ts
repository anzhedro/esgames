import { createSignal } from "solid-js";
import { socket } from "./store";
import { loadUserInfo, saveUserInfo } from "./localstorage";
import { randomInteger } from "../utils/helpers";

const savedUserInfo = loadUserInfo() || { name: "", avatar: randomInteger(1, 25), lastRoom: "" };
export const [avatar, setAvatar] = createSignal(savedUserInfo.avatar);
export const [name, setName] = createSignal(savedUserInfo.name);
export const [room, setRoom] = createSignal(savedUserInfo.lastRoom);

export const refreshAvatar = () => { setAvatar(randomInteger(1, 25)); };

export const [loginStatus, setLoginStatus] = createSignal("fail");
export const [isHost, setIsHost] = createSignal(false);

export function tryLogin(room_id: string) {
  const saved = loadUserInfo();
  if (!saved) {
    loginFail();
    return;
  }

  socket.send(
    JSON.stringify({
      type: "login",
      user: saved.name,
      room: room_id,
      avatar: saved.avatar,
    })
  );
  setLoginStatus("loading");
  return;
};

export function login() {
  saveUserInfo({ name: name(), avatar: avatar(), lastRoom: room() });
  socket.send(
    JSON.stringify({
      type: "login",
      user: name(),
      room: room(),
      avatar: avatar(),
    })
  );
  setLoginStatus("loading");
};

export function loginSuccess() {
  setLoginStatus("success");
};

export function loginFail() {
  setLoginStatus("fail");
};
