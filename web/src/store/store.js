import { Auth } from "./auth";
import { Chat } from "./chat";

import { io } from "socket.io-client";
import { Localization } from "./localization";

const socket = io.connect("http://localhost:5000");

class Store {
  constructor() {
    this.socket = io.connect("http://localhost:5000");
    this.auth = new Auth(this);
    this.chat = new Chat(this);
    this.lang = new Localization(this);
  }
}

export const store = new Store();
