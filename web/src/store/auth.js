import { makeAutoObservable } from "mobx";

export class Auth {
  constructor(store) {
    this.ws = store.socket;
    makeAutoObservable(this);
  }

  user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  login_status = "none";

  login(user, avatar) {
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