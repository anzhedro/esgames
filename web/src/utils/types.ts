import { JSX } from "solid-js";

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

export interface IGame {
  gameId: string; // game id
  title: string; // game title
  settings?: JSX.Element; // all game settings
  rules: JSX.Element; // game rules
  game: JSX.Element; // game
  image: string; // game image
  selectedGameSettings?: any; // selected game settings
  handleBEGameAction: (action: any, payload?: any) => void; // handle game action
}
