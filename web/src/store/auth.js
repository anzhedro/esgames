import { makeAutoObservable } from "mobx";

export class Auth {
  constructor(store) {
    this.ws = store.socket;
    makeAutoObservable(this);
  }

  user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  login_status = "none";

  login(user) {
    if (!user) return;
    // console.log("login zxc", user, this.ws);
    localStorage.setItem("user", JSON.stringify(user));
    this.user = user;

    this.ws.send(JSON.stringify({type: "login", user: user}));
  }

  loginSuccess() {
    this.login_status = "success";
  }

  loginFail() {
    this.login_status = "fail";
  }
}