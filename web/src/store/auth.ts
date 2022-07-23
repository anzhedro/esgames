import { createSignal } from "solid-js";
import { IUser } from "../utils/types";
import { socket } from "./store";

const validLocalUser = () =>
  (localStorage.getItem("user") || "").length ? JSON.parse(localStorage.getItem("user") || "") : null;

type TUser = IUser | any; // should be IUser | null;
const [user, setUser] = createSignal<TUser>({ user: validLocalUser() });
const [loginStatus, setLoginStatus] = createSignal(user() !== null ? "none" : "fail");
const [isLoggedIn, setIsLoggedIn] = createSignal(false);
const [randomRoom, setRandomRoom] = createSignal("");
const [roomToJoin, setRoomToJoin] = createSignal("");

// временное поле для компонента
const [isHost, setIsHost] = createSignal(false);

const tryLogin = (room_id: string) => {
  if (validLocalUser()) {
    socket.send(
      JSON.stringify({ type: "login", user: validLocalUser().name, room: room_id, avatar: validLocalUser().avatarId })
    );
    setLoginStatus("loading");
    return;
  }
  setRoomToJoin(room_id);
  loginFail();
};

const login = (user?: string, avatar?: number) => {
  if (!user) return;
  localStorage.setItem("user", JSON.stringify({ name: user, avatarId: avatar }));

  setRandomRoom(Math.floor(Math.random() * 100) + "");

  socket.send(
    JSON.stringify({
      type: "login",
      user: user,
      room: roomToJoin() ? roomToJoin() : randomRoom(),
      avatar: avatar,
    })
  );
  setLoginStatus("loading");
};

const loginSuccess = () => {
  setLoginStatus("success");
};

const loginFail = () => {
  setLoginStatus("fail");
};

export { isHost, setIsHost, tryLogin, login, loginSuccess, loginFail, loginStatus, randomRoom };
