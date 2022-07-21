import { makeAutoObservable } from "mobx";

const validLocalUser = () => ((localStorage.getItem("user") || "").length ? JSON.parse(localStorage.getItem("user") || "") : null);

export class Auth {
  ws: WebSocket;
  constructor(store: any) {
    this.ws = store.socket;
    makeAutoObservable(this);
  }

  user = validLocalUser();
  login_status = this.user ? "none" : "fail";

  // временное поле для компонента
  isHost = false;


  is_logged_in = false;

  random_room = 0;

  room_to_join = "";

  tryLogin(room_id: string) {
    if (validLocalUser()) {
      this.ws.send(JSON.stringify({ type: "login", user: validLocalUser().name, room: room_id, avatar: validLocalUser().avatarId }));
      this.login_status = "loading";
      return;
    }

    this.room_to_join = room_id;
    this.loginFail();
  }

  login(user?: string, avatar?: number) {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify({ name: user, avatarId: avatar }));
    this.user = user;

    this.random_room = Math.floor(Math.random() * 100);
    this.ws.send(JSON.stringify({ type: "login", user: user, room: this.room_to_join ? this.room_to_join : `${this.random_room}`, avatar: avatar }));
    this.login_status = "loading";
  }

  loginSuccess() {
    this.login_status = "success";
  }

  loginFail() {
    this.login_status = "fail";
  }
}
