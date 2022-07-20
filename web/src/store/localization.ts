import { makeAutoObservable } from "mobx";
import { TLanguage } from "../utils/types";

const localizationMap = {
  en: {
    "/": {
      createRoom: "CREATE ROOM!",
      selectAvatar: "CHOOSE YOUR AVATAR AND NAME",
      yorName: "YOUR NAME",
      join: "JOIN",
    },
    "/lobby": {
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
  },

  ru: {
    "/": {
      createRoom: "СОЗДАТЬ КОМНАТУ!",
      selectAvatar: "ВЫБЕРИ АВАТАР И ИМЯ",
      yorName: "ВАШЕ ИМЯ",
      join: "ВОЙТИ",
    },
    "/lobby": {
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
  },
};

export class Localization {
  constructor() {
    makeAutoObservable(this);
  }
  currentLanguage = "en";
  languages = ["en", "ru"];

  localizationMap = localizationMap;

  setCurrentLanguage(language: TLanguage = "en") {
    this.currentLanguage = language;
  }
}
