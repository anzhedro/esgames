import { nanoid } from "nanoid";
import { copyToClipboard } from "../utils/helpers";
import games from "../utils/games.json";
import { GamesList } from "./GamesList";
import { GameRules } from "./GameRules";
import { GamePlay } from "./GamePlay";
import { GameSettings } from "./GameSettings";
import { createSignal } from "solid-js";
import { useParams } from "solid-app-router";

export const GamesTable = () => {
  const [mode, setMode] = createSignal("select");
  const params = useParams();

  return (
    <div class="games_table">
      <div class="games_table_wrapper">
        {mode() === "select" && <GamesList games={games} id={params.id} setMode={setMode} />}
        {mode() === "settings" && <GameSettings setMode={setMode} />}
        {mode() === "rules" && <GameRules setMode={setMode} />}
        {mode() === "play" && <GamePlay  />}
      </div>
    </div>
  );
};
