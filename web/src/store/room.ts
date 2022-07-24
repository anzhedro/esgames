import { IPlayer } from "../utils/types";
import { createStore } from "solid-js/store";
import { socket } from "./store";
import { createSignal } from "solid-js";

const AliasSettings = {
  settings: {
    roundTime: [30, 60, 90],
    roundsCount: [2, 3, 4],
    difficulty: ["easy", "medium", "hard"],
    wordsLanguage: ["en", "ru"],
    // необязательное количетсво команд
    teamsCount: [2, 3, 4],
  },
};

const SettingsAliasToBack = {
  type: "create_game",
  gameName: "alias",
  roundTime: 30,
  roundsCount: 4,
  difficulty: "easy",
  wordsLanguage: "ru",
  teamsCount: 2,
};

// настроящие настройки
// текущие настройки

const SocketCurrentGame = {
  type: "game_state",
  gameName: "alias",
  roundTime: 30,
  roundsCount: 4,
  difficulty: "easy",
  wordsLanguage: "ru",
  teamsCount: 2,

  teams: [
    // team 1
    {
      score: 1,
      players: [
        {
          name: "sloth",
          avatarId: 1,
        },
        {
          name: "sloth",
          avatarId: 2,
        },
      ],
    },
  ],

  // штуки которые меняются

  // какой по счету раунд
  currentRound: 3,

  currentWord: "",

  currentTeam: 1,
  // какой по счету игрок в команде объясняет слова
  currentPlayer: 1,

  teamScore: [],
};

const [users, setUsers] = createSignal<IPlayer[]>([]);

const handleKick = (user: string) => {
  socket.send(JSON.stringify({ type: "kick_user", user: user }));
}

export { users, handleKick, setUsers };