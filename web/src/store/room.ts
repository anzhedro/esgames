import { IPlayer } from "../utils/types";
import { socket } from "./socket";
import { createSignal } from "solid-js";
import { appState } from "./state";
import { localizationMap } from "./localization";

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

export const [users, setUsers] = createSignal<IPlayer[]>([]);
export const [currentGame, setCurrentGame] = createSignal("");
export const [showButton, setShowButton] = createSignal(false);

type GameTableState = "game_select" | "game_rules" | "game_settings" | "game_play" | "game_end" | "hat";
export const [tableState, setTableState] = createSignal<GameTableState>("game_select");

export interface gameSettingsOptinos {
  roundTime: number[];
  roundsCount: number[];
  difficulty: number[];
  wordsLanguage: string[];
  teamsCount: number[];
}

export const [gameSettingsOptinos, setGameSettingsOptinos] = createSignal<Partial<gameSettingsOptinos>>({});

export const [selectedGameSettings, setSelectedGameSettings] = createSignal({
  gameId: 1,
  roundTime: 10,
  roundCount: 3,
  difficulty: "Easy",
  teamsCount: 2,
});

export const [currentGameId, setCurrentGameId] = createSignal("");

export function startGame() {
  socket()!.send(
    JSON.stringify({
      type: "start_game",
      game: localizationMap.en.gameTitles[currentGameId()].toLowerCase(),
      settings: selectedGameSettings(),
    })
  );
}

export function sendGameAction(action_data: any) {
  socket()!.send(
    JSON.stringify({
      type: "game_action",
      action: action_data.action,
    })
  );
}

export function handleKick(user: string) {
  if (appState() !== "connected") return;
  socket()!.send(JSON.stringify({ type: "kick_user", user: user }));
}
