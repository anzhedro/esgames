import { makeAutoObservable } from "mobx";

export const formatDate = (date) => {
  return `  ${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
};

export class Chat {
  constructor(store) {
    this.ws = store.socket;
    makeAutoObservable(this);
  }

  message = "";
  // Format: { created: "2020-12-01 12:00", user: "aaaa", text: "Hello!" }
  messages = [
    { created: "2020-12-01 12:00", user: "aaaa", text: "Hello!" },
  ];

  addSmile(smile) {
    this.message += " " + smile;
  }

  typeMessage = (e = false) => {
    if (e) {
      this.message = e.target.value;
      return;
    }
    this.message = "";
  };

  sendMessage(text) {
    if (!text) return;

    this.ws.send(JSON.stringify({ type: "chat", text: text }));
  }

  addMessage(messages) {
    this.messages = [...this.messages, ...messages];
    this.message = "";
  }

  setMessages(newMessages) {
    this.messages = newMessages;
  }
}
