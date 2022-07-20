import { makeAutoObservable } from "mobx";

const validLocalUser = () => (localStorage.getItem("user") || "".length ? JSON.parse(localStorage.getItem("user") || "") : null);

export class Auth {
  ws: WebSocket;
  constructor(store: any) {
    this.ws = store.socket;
    makeAutoObservable(this);
  }

  user = validLocalUser();
  login_status = this.user ? "none" : "fail";

  tryLogin() {
    console.log(validLocalUser());
    if (validLocalUser()) {
      // this.ws.send(JSON.stringify({ type: "login", user: user, room: "global", avatar: avatar }));
      this.login(validLocalUser().name, validLocalUser().avatarId);
      return;
    }
    this.loginFail();
  }

  login(user?: string, avatar?: number) {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify({ name: user, avatarId: avatar }));
    this.user = user;
    if (user == "zxc") {
      this.ws.send(JSON.stringify({ type: "login", user: user, room: "zxcroom", avatar: avatar }));
      return;
    }
    this.ws.send(JSON.stringify({ type: "login", user: user, room: "global", avatar: avatar }));
  }

  loginSuccess() {
    console.log("ok");
    this.login_status = "success";
  }

  loginFail() {
    this.login_status = "fail";
  }
}
