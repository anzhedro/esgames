import { nanoid } from "nanoid";
import { For } from "solid-js";
import { copyToClipboard } from "../utils/helpers";
import { GameListProps, IGame } from "../utils/types";

export const GamesList = (props: GameListProps) => {
  return (
    <>
      <div class="header">
        <button>ИГРЫ</button>
        {/* <button>НАСТРОЙКИ</button> */}
      </div>

      <div class="content">
        <For each={props.games} fallback={<div>Loading...</div>}>
          {(game: IGame) => (
            <div class="game_card" onClick={() => props.setMode("rules")}>
              <img src={game.image} />
              <p>{game.title}</p>
            </div>
          )}
        </For>

      </div>
      <div class="footer">
        <button onClick={() => copyToClipboard("localhost:3000/lobby/" + props.id)}>ПРИГЛАСИТЬ</button>
      </div>
    </>
  );
};
