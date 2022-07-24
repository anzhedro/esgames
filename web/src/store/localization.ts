import { createSignal } from "solid-js";

export type Translation = {
  createRoom: string,
  loginText: string,
  yourName: string,
  roomName: string,
  join: string,
  playersHeader: string,
  player: string,
  spectators: string,
  gamesHeader: string,
  inviteFooter: string,
  backFooter: string,
  startFooter: string,
  chat: string,
  messagePlaceholder: string,
};


const localizationMap: Record<string, Translation> = {
  "en": {
    createRoom: "CREATE ROOM",
    loginText: "Enter your name and a room to join",
    yourName: "YOUR NAME",
    roomName: "ROOM NAME",
    join: "JOIN",

    playersHeader: "PLAYERS",
    player: "PLAYER",
    spectators: "SPECTATORS",

    gamesHeader: "GAMES",

    inviteFooter: "INVITE",
    backFooter: "BACK",
    startFooter: "START",

    chat: "CHAT",
    messagePlaceholder: "Your message...",
  },

  "ru": {
    createRoom: "СОЗДАТЬ КОМНАТУ",
    loginText: "Введите ваше имя и название комнаты для входа",
    yourName: "ВАШЕ ИМЯ",
    roomName: "ИМЯ КОМНАТЫ",
    join: "ВОЙТИ",

    playersHeader: "ИГРОКОВ",
    player: "ИГРОК",
    spectators: "ЗРИТЕЛИ",

    gamesHeader: "ИГРЫ",

    inviteFooter: "ПРИГЛАСИТЬ",
    backFooter: "НАЗАД",
    startFooter: "НАЧАТЬ",

    chat: "ЧАТ",
    messagePlaceholder: "Ваше сообщение...",
  },
};

const [currentLanguage, setCurrentLanguage] = createSignal("en");
const languages = Object.keys(localizationMap);

const handleSetCurrentLanguage = (language: string) => {
  setCurrentLanguage(language);
};

export { currentLanguage, handleSetCurrentLanguage, languages, localizationMap };