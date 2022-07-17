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

export const formatDate = (date) => {
  return `  ${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
};

export class Chat {
  constructor() {
    makeAutoObservable(this);
  }

  message = "";
  messages = mockedMessages;

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

  addMessage(author, text) {
    if (!text) return;
    if (text.length > 100) return;

    this.messages = [
      ...this.messages,
      {
        time: formatDate(new Date()),
        author: author,
        text: text,
      },
    ];
    this.message = "";
  }

  setMessages(newMessages) {
    this.messages = newMessages;
  }
}
