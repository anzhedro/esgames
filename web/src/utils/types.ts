export interface IPlayer {
    name: string,
    avatar: number,
    is_host: boolean
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
  