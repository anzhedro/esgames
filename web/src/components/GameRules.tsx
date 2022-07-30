import { Show } from "solid-js";
import { setTableState, startGame, gameSettingsOptions, currentGame } from "../store/room";
import { iAmHost } from "../store/state";
import * as hat from "../games/Hat";
import * as reaction from "../games/Reaction";

export const GameRules = () => {
  return (
    <>
      <div class="header" style={{ justifyContent: "space-around" }}>
        <button onClick={() => setTableState("game_rules")}>ПРАВИЛА</button>

        <Show when={currentGame()?.settings}>
          <button onClick={() => setTableState("game_settings")}>НАСТРОЙКИ</button>
        </Show>
      </div>
      <div class="content game_rules">{currentGame()!.rules}</div>
      <div class="footer">
        <button onClick={() => setTableState("game_select")}>НАЗАД</button>

        <Show when={iAmHost()} fallback={<div></div>}>
          <button onClick={() => startGame()}>НАЧАТЬ</button>
        </Show>
      </div>
    </>
  );
};
