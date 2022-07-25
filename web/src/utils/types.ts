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
