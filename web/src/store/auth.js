import { makeAutoObservable } from "mobx";

export class Auth {
  constructor(par) {
    this.par = par;
    makeAutoObservable(this);
  }

  user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  login_status = "none";

  login(user) {
    console.log("login", user);
    localStorage.setItem("user", JSON.stringify(user));
    this.user = user;

    this.par.socket.emit("login", user);
    this.login_status = "pending";

    this.par.socket.on("login_success", (user) => {
      console.log("login_success", user);
      this.login_status = "success";
    });

    this.par.socket.on("login_fail", (user) => {
      console.log("login_fail", user);
      this.login_status = "fail";
    });
  }
}
