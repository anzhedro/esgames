import { createSignal } from "solid-js";
import { IMessage } from "../utils/types";
import { socket } from "./store";

// gonna remove when back ready
export const formatDate = (date: any) => {
  return `  ${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
};

const [message, setMessage] = createSignal("");
// Format: { created: "2020-12-01 12:00", user: "aaaa", text: "Hello!" }
const [messages, setMessages] = createSignal<IMessage[]>([]);

const addSmile = (smile: string) => {
  setMessage(message() + " " + smile);
};

const sendMessage = (text: string) => {
  if (!text) return;
  socket.send(JSON.stringify({ type: "chat", text: text }));
};

const addMessage = (newmessages: IMessage[]) => {
  setMessages([...messages(), ...newmessages]);
  setMessage("");
};

export { addSmile, sendMessage, addMessage, messages, message, setMessage };
