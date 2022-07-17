import { makeAutoObservable } from "mobx";

const mockedMessages = [
  { time: "12:00", author: "aaaa", text: "Hello!" },
  { time: "12:01", author: "bbaa", text: "Hi!" },
  { time: "12:02", author: "ccaa", text: "How are you?" },
  { time: "12:03", author: "ddaa", text: "I'm fine!" },
  { time: "12:04", author: "eeaa", text: "And you?" },
  { time: "12:05", author: "ffaa", text: "I'm fine too!" },
  { time: "12:06", author: "ggaa", text: "And you?" },
  { time: "12:07", author: "hh", text: "I'm fine too!" },
  { time: "12:00", author: "aa", text: "Hello!" },
  { time: "12:01", author: "bb", text: "Hi!" },
  { time: "12:02", author: "cc", text: "How are you?" },
  { time: "12:03", author: "dd", text: "I'm fine!" },
  { time: "12:04", author: "ee", text: "And you?" },
  { time: "12:05", author: "ff", text: "I'm fine too!" },
  { time: "12:06", author: "gg", text: "And you?" },
  { time: "12:07", author: "hh", text: "I'm fine too!" },
  { time: "12:00", author: "aa", text: "Hello!" },
  { time: "12:01", author: "bb", text: "Hi!" },
  { time: "12:02", author: "cc", text: "How are you?" },
  { time: "12:03", author: "dd", text: "I'm fine!" },
  { time: "12:04", author: "ee", text: "And you?" },
  { time: "12:05", author: "ff", text: "I'm fine too!" },
  { time: "12:06", author: "gg", text: "And you?" },
  { time: "12:07", author: "hh", text: "I'm fine too!" },
];

export class Chat {
  constructor() {
    makeAutoObservable(this);
  }

  message = "";

  messages = localStorage.getItem("messages")
    ? JSON.parse(localStorage.getItem("messages"))
    : mockedMessages;

  addSmile(smile) {
    this.message += " " + smile;
  }

  clearMessage() {
    this.message = "";
  }

  typeMessage = (e = false) => {
    if (e) {
      this.message = e.target.value;
      return;
    }
    this.message = "";
  };

  setMessages(newMessages) {
    console.log("ccccc", this.message);
    localStorage.setItem("messages", this.messages);
    console.log("messages", newMessages);
    this.messages = newMessages;
    localStorage.setItem("messages", JSON.stringify(newMessages));
  }
}
