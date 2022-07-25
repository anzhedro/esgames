import { GamesList } from "./GamesList";
import { GameRules } from "./GameRules";
import { GamePlay } from "./GamePlay";
import { GameSettings } from "./GameSettings";
import { Match, Switch } from "solid-js";
import { tableState } from "../store/room";

export const GamesTable = () => {
  return (
    <div class="games_table">
      <div class="games_table_wrapper">
        <Switch fallback={``}>
          <Match when={tableState() === "game_select"}>
            <GamesList />
          </Match>

          <Match when={tableState() === "game_settings"}>
            <GameSettings />
          </Match>

          <Match when={tableState() === "game_rules"}>
            <GameRules />
          </Match>

          <Match when={tableState() === "game_play"}>
            <GamePlay isDemo={false} />
          </Match>
        </Switch>
      </div>
    </div>
  );
};
