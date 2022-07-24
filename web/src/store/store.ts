import { loginFail, loginSuccess } from "./auth";
import { addMessage } from "./chat";
import { setUsers, users } from "./room";
import { createSignal } from "solid-js";

const socket: WebSocket = new WebSocket("ws://localhost:8000/ws");
const [socketReady, setSocketReady] = createSignal(0);

socket.onopen = (event) => {
  console.log("ws OPEN", event);
  setSocketReady(1);
};

socket.onmessage = (event) => {
  const response = JSON.parse(event.data);
  console.log("ws GOT: ", response);
  switch (response.type) {
    case "login_success":
      loginSuccess();
      return;
    case "login_fail":
      loginFail();
      return;
    case "chat":
      addMessage(response.messages);
      return;
    case "room":
      setUsers(response.users);
      return;
    case "kick_user":
      alert(response.reason);
      loginFail();
      return;
  }
};

socket.onerror = (event) => {
  console.log("ws ERR", event);
};

socket.onclose = (event) => {
  console.log("ws CLOSE", event);
};

export { socket, socketReady };