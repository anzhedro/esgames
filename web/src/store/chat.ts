import { createSignal } from "solid-js";
import { IMessage } from "../utils/types";
import { socket } from "./socket";
import { appState } from "./state";

// gonna remove when back ready
export const formatDate = (d: Date) => {
  return `  ${d.getHours() < 10 ? "0" + d.getHours() : d.getHours()}:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()
    }`;
};

const [messages, setMessages] = createSignal<IMessage[]>([]);
export const [chatInput, setChatInput] = createSignal("");

export function sendMessage() {
  const text = chatInput().trim();
  if (!text || appState() !== "connected") return;

  socket()!.send(JSON.stringify({ type: "chat", text: text }));
  setChatInput("");
};

export function addMessages(newmessages: IMessage[]) {
  setMessages([...messages(), ...newmessages]);
};

export { messages };