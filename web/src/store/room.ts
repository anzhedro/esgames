import { makeAutoObservable } from "mobx";
import { IPlayer } from "../utils/types";

export class Room {
  ws: WebSocket;
  constructor(store: any) {
    this.ws = store.socket;
    makeAutoObservable(this);
  }

  users: IPlayer[] = [];

  setUsers(users: IPlayer[]) {
    this.users = users;
  }
}
