import { nanoid } from "nanoid";
import { copyToClipboard } from "../utils/helpers";
import games from "../utils/games.json";
import { GamesList } from "./GamesList";
import { GameRules } from "./GameRules";
import { GamePlay } from "./GamePlay";
import { GameSettings } from "./GameSettings";
import { createSignal, Match, Switch } from "solid-js";
import { useParams } from "solid-app-router";

export const GamesTable = () => {
  const [mode, setMode] = createSignal("select");
  const params = useParams();

  return (
    <div class="games_table">
      <div class="games_table_wrapper">
        <Switch fallback={``}>
          <Match when={mode() === "select"}>
            <GamesList games={games} id={params.id} setMode={setMode} />
          </Match>

          <Match when={mode() === "settings"}>
            <GameSettings setMode={setMode} />
          </Match>

          <Match when={mode() === "rules"}>
            <GameRules setMode={setMode} />
          </Match>

          <Match when={mode() === "play"}>
            <GamePlay />
          </Match>
        </Switch>
      </div>
    </div>
  );
};
