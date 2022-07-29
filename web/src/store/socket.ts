import { iAmHost, setAppState, setRoom } from "./state";
import { addMessages } from "./chat";
import { setCurrentGame, setTableState, setShowButton, setUsers } from "./room";
import { createSignal } from "solid-js";
import { byName } from "../games/games";
import { IMessage, IPlayer } from "../utils/types";

interface wsMessage extends gameActionMessage {
  type: string;
  room: string;
  messages: IMessage[];
  users: IPlayer[];
  game: string;
  reason: string;
}

interface gameActionMessage {
  action: string;
  payload?: any;
}

const [socket, setSocket] = createSignal<WebSocket | null>(null);

export function connectToRoom(user: string, room: string, avatar: number) {
  setAppState("connecting");
  const soc = new WebSocket("ws://" + location.host + "/ws");
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
    const response = JSON.parse(event.data) as wsMessage;
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
          setCurrentGame(byName(response.game));
          setTableState("game_play");
        } else {
          setTableState("game_select");
        }
        return;
      case "game_action":
        const { action, payload } = response as gameActionMessage;
        // TODO: dispatch action to a particular game
        // Handling actions for "reaction" game
        switch (action) {
          case "press_btn":
            setShowButton(true);
            return;
          case "your_time_sec":
            socket()!.send(JSON.stringify({ type: "chat", text: `My reaction time is ${payload}` }));
            return;
          case "game_over":
            if (iAmHost()) {
              socket()!.send(JSON.stringify({ type: "chat", text: `Total is ${payload}` }));
            }
            return;
          default:
            return;
        }
      case "kick_user":
        alert(response.reason);
        setSocket(null);
        setAppState("start");
        return;
    }
  };
}

export { socket };
