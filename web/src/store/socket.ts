import { setAppState, setRoom } from "./state";
import { addMessages } from "./chat";
import { setUsers } from "./room";
import { createSignal } from "solid-js";

const [socket, setSocket] = createSignal<WebSocket | null>(null);

export function connectToRoom(user: string, room: string, avatar: number) {
  setAppState("connecting");

  const soc = new WebSocket("ws://localhost:8000/ws");
  setSocket(soc);

  soc.onclose = (event) => {
    console.log("ws CLOSE", event);
    // Reconnect only if we are supposed to have an open socket.
    if (socket() !== null) { 
      setSocket(null);
      setTimeout(() => {
        connectToRoom(user, room, avatar);
      }, 1000);
    }
  };

  soc.onopen = (event) => {
    console.log("ws OPEN", event);
    soc.send(JSON.stringify({
      type: "login",
      user,
      room,
      avatar,
    }));
  };

  soc.onerror = (event) => {
    console.log("ws ERR", event);
  };

  soc.onmessage = (event) => {
    const response = JSON.parse(event.data);
    console.log("ws GOT: ", response);
    switch (response.type) {
      case "login_success":
        setRoom(response.room);
        setAppState("connected");
        return;
      case "login_fail":
        setSocket(null);
        setAppState("start");
        return;
      case "chat":
        addMessages(response.messages);
        return;
      case "room":
        setUsers(response.users);
        return;
      case "kick_user":
        alert(response.reason);
        setSocket(null);
        setAppState("start");
        return;
    }
  };
}

export { socket };