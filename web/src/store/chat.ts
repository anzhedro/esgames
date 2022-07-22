import { makeAutoObservable } from "mobx";
import React, { ChangeEvent } from "react";
import { IMessage } from "../utils/types";

// gonna remove when back ready
export const formatDate = (date: any) => {
  return `  ${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
};

export class Chat {
  ws: WebSocket;
  constructor(store: any) {
    this.ws = store.socket;
    makeAutoObservable(this);
  }

  message = "";
  // Format: { created: "2020-12-01 12:00", user: "aaaa", text: "Hello!" }
  messages = [] as IMessage[];

  addSmile(smile: string) {
    this.message += " " + smile;
  }

  typeMessage = (str: string) => {
    this.message = str
  };

  sendMessage(text: string) {
    if (!text) return;
    this.ws.send(JSON.stringify({ type: "chat", text: text }));
  }

  addMessage(messages: IMessage[]) {
    this.messages = [...this.messages, ...messages];
    this.message = "";
  }
}
