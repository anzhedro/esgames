import { Auth } from "./auth";
import { Chat } from "./chat";
import { Room } from "./room";
import { Localization } from "./localization";
import { IPlayer } from "../utils/types";

auth: Auth;
chat: Chat;
lang: Localization;
room: Room;

const socket : WebSocket = new WebSocket("ws://localhost:8000/ws");
const lang = new Localization();
const auth = new Auth(this);
const chat = new Chat(this);
const room = new Room(this);

socket.onopen = (event) => {
  console.log("ws OPEN", event);
};

socket.onmessage = (event) => {
  const response = JSON.parse(event.data);
  console.log("ws GOT: ", response);
  switch (response.type) {
    case "login_success":
      const auth.loginSuccess();
      return;
    case "login_fail":
      const auth.loginFail();
      return;
    case "chat":
      const chat.addMessage(response.messages);
      return;
    case "room":
      const room.setUsers(response.users);
      return;
      case "user_kicked" : {
        setUsers(users().filter((user:IPlayer) => user.name !== response.user));
      }
  }
};

socket.onerror = (event) => {
  console.log("ws ERR", event);
};

socket.onclose = (event) => {
  console.log("ws CLOSE", event);
};

export {socket}