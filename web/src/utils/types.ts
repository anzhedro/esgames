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

  export type ChatMessageProps = {
    created: string;
    user: string;
    text: string;
    ref: any;
  };

  export type DifficultyProps = {
    option: {
      currentOption: string;
      options: string[];
    };
  };

  export type CommandsCountProps = {
    counts: number[];
  };

  export type GameSettingsProps = {
    setMode: (mode: string) => void;
  }

  export interface IGame {
    title: string;
    image: string;
  }
  
  export type GameListProps = {
    games: Game[];
    id: string,
    setMode: (str: string) => void;
  }