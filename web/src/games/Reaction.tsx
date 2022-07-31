import { sendGameAction, setShowButton, showButton } from "../store/room";
import { Show, createSignal } from "solid-js";
import { IGame } from "../utils/types";
import { sendMsg } from "../store/chat";
import { randomInteger } from "../utils/helpers";

const rules = () => {
  return <p>Ждите с нетерпением появления кнопки и жмякните её быстрее всех.</p>;
};

const game = () => {
  return (
    <Show when={showButton()} fallback={<div></div>}>
      <div class="re" style={{ height: "100%" }}>
        <div class="central_column" style={{ position: "relative", height: "100%" }}>
          <button
            class="reaction_btn"
            style={{ position: "absolute", left: position().x + "%", top: position().y + "%" }}
            onClick={press_btn}
          >
            <div class="dot"></div>
          </button>
        </div>
      </div>
    </Show>
  );
};

const randomPosition = () => {
  return {
    x: randomInteger(5, 80),
    y: randomInteger(5, 80),
  };
};

const [position, setPosition] = createSignal(randomPosition());

const press_btn = () => {
  setPosition(randomPosition());
  console.log(position());
}

const actions = {
  press_btn: () => setShowButton(true),
  your_time_sec: (sec: number) => sendMsg(`My reaction time is ${sec}`),
  game_over: (total: number) => sendMsg(`Game over. Total time: ${total}`),
};

export const Game: IGame = {
  gameId: "reaction",
  title: "Reaction",
  imageUrl: "/img/speed.svg",
  rulesEl: rules,
  gameEl: game,
  onGameAction: (action, payload) => actions[action as keyof typeof actions](payload),
};
