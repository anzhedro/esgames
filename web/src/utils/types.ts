import { JSX } from 'solid-js';

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
  imageUrl: string; // game's image url
  settingsEl?: JSX.Element;
  rulesEl: JSX.Element;
  gameEl: JSX.Element;
  getSettings?: () => Record<string, unknown>; // function that returns current game settings
  onGameAction: (action: string, payload?: unknown) => void; // handle game action
}
