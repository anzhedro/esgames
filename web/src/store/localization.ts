import { createSignal } from "solid-js";

type Translation = {
  createRoom: string,
  selectAvatar: string,
  yourName: string,
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
    createRoom: "CREATE ROOM!",
    selectAvatar: "CHOOSE YOUR AVATAR AND NAME",
    yourName: "YOUR NAME",
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
    createRoom: "СОЗДАТЬ КОМНАТУ!",
    selectAvatar: "ВЫБЕРИ АВАТАР И ИМЯ",
    yourName: "ВАШЕ ИМЯ",
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