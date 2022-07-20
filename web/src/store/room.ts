import { makeAutoObservable } from "mobx";

export class Room {
  ws: WebSocket;
  constructor(store:any) {
    this.ws = store.socket;
    makeAutoObservable(this);
  }

  // Format: {name: "user1", avatar: 12, is_host: false}
  users = [];

  setUsers(users) {
    // console.log("setUsers", users);
    this.users = users;
  }
}
