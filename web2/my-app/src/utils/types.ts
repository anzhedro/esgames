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
  
  export type WordItemProps = {
    canEdit?: boolean;
    color?: string;
    text?: string;
    countInit?: number;
  };

  export interface IUser {
    name: string;
    avatarId: number;
  }