import { Auth } from "./auth";
import { Chat } from "./chat";
import { Room } from "./room";
import { Localization } from "./localization";

class Store {
  socket: WebSocket;
  auth: Auth;
  chat: Chat;
  lang: Localization;
  room: Room;

  constructor() {
    this.socket = new WebSocket("ws://localhost:8000/ws");

    this.auth = new Auth(this);
    this.chat = new Chat(this);
    this.lang = new Localization();
    this.room = new Room(this);
    
    this.socket.onopen = (event) => {
      console.log("socket open", event);
    };

    this.socket.onmessage = (event) => {
      const o = JSON.parse(event.data);
      console.log("Got: ", o);
      switch (o.type) {
        case "login_success":
          this.auth.loginSuccess();
          return;
        case "login_fail":
          this.auth.loginFail();
          return;
        case "chat":
          this.chat.addMessage(o.messages);
          return;
        case "room":
          this.room.setUsers(o.users);
          return;
      }
    };

  }
}

export const store = new Store();