export interface IPlayer {
  name: string;
  avatar: number;
  is_host: boolean;
}

export interface IMessage {
  created: string;
  user: string;
  text: string;
}

export interface RefType<T> {
  readonly current: T | null;
}

export type WordItemProps = {
  canEdit?: boolean;
  color?: string;
  text?: string;
  countInit?: number;
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
};

export interface IGame {
  title: string;
  image: string;
}

export type GameListProps = {
  games: IGame[];
  id: string;
  setMode: (str: string) => void;
};
