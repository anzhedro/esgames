import { Auth } from "./auth";
import { Chat } from "./chat";
import { Localization } from "./localization";

class Store {
  constructor() {
    this.socket = new WebSocket("ws://localhost:8000/ws");
    this.auth = new Auth(this);
    this.chat = new Chat(this);
    this.lang = new Localization(this);
    
    this.socket.onopen = (event) => {
      console.log("socket open", event);
    };

    this.socket.onmessage = (event) => {
      const o = JSON.parse(event.data);
      console.log("onmessage", o);
    };
  }
}

export const store = new Store();