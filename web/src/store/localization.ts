// import { makeAutoObservable } from "mobx";
import { createSignal } from "solid-js";
import { TLanguage } from "../utils/types";

const localizationMap = {
  en: {
    createRoom: "CREATE ROOM!",
    selectAvatar: "CHOOSE YOUR AVATAR AND NAME",
    yorName: "YOUR NAME",
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

  ru: {
    createRoom: "СОЗДАТЬ КОМНАТУ!",
    selectAvatar: "ВЫБЕРИ АВАТАР И ИМЯ",
    yorName: "ВАШЕ ИМЯ",
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

const handleSetCurrentLanguage = (language: TLanguage = "en") => {
  setCurrentLanguage(language);
};

export { currentLanguage, handleSetCurrentLanguage, languages, localizationMap };