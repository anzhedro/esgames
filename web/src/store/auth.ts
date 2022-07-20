import { makeAutoObservable } from "mobx";

const validLocalUser = () => JSON.parse(localStorage.getItem('user') || '').length ? JSON.parse(localStorage.getItem('user') || '') : null

export class Auth {
  ws: WebSocket;
  constructor(store:any) {
    this.ws = store.socket;
    makeAutoObservable(this);
  }

  user = validLocalUser()
  login_status = this.user ? "none" : "fail";

  login(user:string, avatar:number) {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
    this.user = user;
    this.ws.send(JSON.stringify({type: "login", user: user, room: "global", avatar: avatar}));
  }

  loginSuccess() {
    this.login_status = "success";
  }

  loginFail() {
    this.login_status = "fail";
  }
}