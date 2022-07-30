import { IPlayer, IGame } from "../utils/types";
import { socket } from "./socket";
import { createSignal } from "solid-js";
import { appState } from "./state";

type GameTableState = "game_select" | "game_rules" | "game_settings" | "game_play" | "game_end";

export const [users, setUsers] = createSignal<IPlayer[]>([]);
export const [currentGame, setCurrentGame] = createSignal<IGame | undefined>(undefined);
export const [showButton, setShowButton] = createSignal(false);
export const [tableState, setTableState] = createSignal<GameTableState>("game_select");

export function startGame() {
  socket()!.send(
    JSON.stringify({
      type: "start_game",
      game: currentGame()!.gameId,
      settings: currentGame()!.selectedGameSettings(),
    })
  );
}

export function send(text: string) {
  socket()!.send(JSON.stringify({ type: "chat", text: text }));
}

export function sendGameAction(action: string, payload?: Object | Array<any>) {
  socket()!.send(
    JSON.stringify({
      type: "game_action",
      action,
      payload,
    })
  );
}

export function handleKick(user: string) {
  if (appState() !== "connected") return;
  socket()!.send(JSON.stringify({ type: "kick_user", user: user }));
}
