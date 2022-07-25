import { iAmHost, setAppState, setRoom } from "./state";
import { addMessages } from "./chat";
import { setCurrentGame, setTableState, setShowButton, setUsers } from "./room";
import { createSignal } from "solid-js";
import { IMessage, IPlayer } from "../utils/types";

interface wsResponse {
  type: string;
  room: string;
  messages: IMessage[];
  users: IPlayer[];
  game: Record<string, string>;
  action: Record<string, any>;
  reason: string;
}

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
    soc.send(
      JSON.stringify({
        type: "login",
        user,
        room,
        avatar,
      })
    );
  };

  soc.onerror = (event) => {
    console.log("ws ERR", event);
  };

  soc.onmessage = (event) => {
    const response = JSON.parse(event.data) as wsResponse;
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
        if (response.game) {
          setCurrentGame(response.game.name);
          setTableState("game_play");
        } else {
          setTableState("game_select");
        }
        return;
      case "game_action":
        if ("already_pressed" in response.action) {
          setShowButton(true);
          return;
        }
        if (response.action.your_time_sec) {
          socket()!.send(JSON.stringify({ type: "chat", text: `My reaction time is ${response.action.your_time_sec}` }));
          return;
        }
        if (response.action.total_time_sec) {
          if (iAmHost()) {
            socket()!.send(JSON.stringify({ type: "chat", text: `Total is ${response.action.total_time_sec}` }));
          }
          return;
        }
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
