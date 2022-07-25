import { Show } from "solid-js";
import { setTableState, startGame, gameSettingsOptinos } from "../store/room";
import { iAmHost } from "../store/state";
import { AliasRules } from "./AliasRules";

export const GameRules = () => {
  return (
    <>
      <div class="header" style={{ justifyContent: "space-around" }}>
        <button onClick={() => setTableState("game_rules")}>ПРАВИЛА</button>

        <Show when={Object.keys(gameSettingsOptinos()).length === 0}>
          <button onClick={() => setTableState("game_settings")}>НАСТРОЙКИ</button>
        </Show>
      </div>
      <div class="content game_rules">
        <AliasRules />
      </div>
      <div class="footer">
        <button onClick={() => setTableState("game_select")}>НАЗАД</button>

        <Show when={iAmHost()} fallback={<div></div>}>
          <button onClick={() => startGame()}>НАЧАТЬ</button>
        </Show>
      </div>
    </>
  );
};
