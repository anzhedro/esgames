export interface IPlayer {
    "name": "Soth",
    "avatarId": "16",
    "type": "host"
  }

  export interface IMessage {
    created: string;
    user: string;
    text: string;
  }

  export type TLanguage = "en" | "ru";

  export interface RefType<T> {
    readonly current: T | null
  }
  
  export interface IMessage {
    time: string;
    author: string;
    text: string;
  }