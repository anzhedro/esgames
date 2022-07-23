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
    this.lang = new Localization();

    this.auth = new Auth(this);
    this.chat = new Chat(this);
    this.room = new Room(this);

    this.socket.onopen = (event) => {
      console.log("ws OPEN", event);
    };

    this.socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log("ws GOT: ", response);
      switch (response.type) {
        case "login_success":
          this.auth.loginSuccess();
          return;
        case "login_fail":
          this.auth.loginFail();
          return;
        case "chat":
          this.chat.addMessage(response.messages);
          return;
        case "room":
          this.room.setUsers(response.users);
          return;
        case "kick_user":
          alert(response.reason);
          this.auth.loginFail();
          return;
      }
    };

    this.socket.onerror = (event) => {
      console.log("ws ERR", event);
    };

    this.socket.onclose = (event) => {
      console.log("ws CLOSE", event);
    };
  }
}

export const store = new Store();
