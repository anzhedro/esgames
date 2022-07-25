import { For } from "solid-js";
import { setCurrentGameId, setGameSettingsOptinos, setTableState } from "../store/room";
import { copyToClipboard } from "../utils/helpers";
import { Spinner } from "./Spinner";

import games from "../utils/games.json";
import { useParams } from "solid-app-router";

interface IGame {
  title: string;
  image: string;
  gameId: string;
  settings: Record<string, any>;
}

export const GamesList = () => {
  const params = useParams();

  return (
    <>
      <div class="header">
        <button>ИГРЫ</button>
      </div>

      <div class="content">
        <For each={games} fallback={<Spinner />}>
          {(game: IGame | any) => (
            <div
              class="game_card"
              onClick={() => {
                setTableState("game_rules");
                setCurrentGameId(game.gameId);
                setGameSettingsOptinos(game.settings);
              }}
            >
              <img src={game.image} />
              <p>{game.title}</p>
            </div>
          )}
        </For>
      </div>
      <div class="footer">
        <button onClick={() => copyToClipboard("localhost:3000/lobby/" + params.id)}>ПРИГЛАСИТЬ</button>
      </div>
    </>
  );
};
