import { sendGameAction, setShowButton, showButton } from "../store/room";
import { Show } from "solid-js";
import { IGame } from "../utils/types";

const rules = () => {
  return <p>Ждите с нетерпением появления кнопки и жмякните её быстрее всех.</p>;
};

const game = () => {
  return (
    <Show when={showButton()} fallback={<div></div>}>
      <div class="re">
        <div class="central_column">
          <button
            class="green_btn"
            onClick={() => {
              sendGameAction("click");
              setShowButton(false);
            }}
          >
            CLICK
          </button>
        </div>
      </div>
    </Show>
  );
};

export const Game: IGame = {
  gameId: "reaction",
  title: "Reaction",
  image: "/img/speed.svg",
  rules,
  game,
};
