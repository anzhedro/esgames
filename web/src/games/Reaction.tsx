import { Show, createSignal } from 'solid-js';
import { setShowButton, showButton, sendGameAction } from '../store/room';
import { IGame } from '../utils/types';
import { sendMsg } from '../store/chat';
import { randomInteger } from '../utils/helpers';

const rules = () => <p>Ждите с нетерпением появления кнопки и жмякните её быстрее всех.</p>;

const game = () => (
  <Show when={showButton()} fallback={<div></div>}>
    <div class="reaction_game">
      <div class="central_column">
        <button
          class="reaction_btn"
          style={{
            left: `${position().x}%`,
            top: `${position().y}%`,
          }}
          onClick={() => {
            if (timesClicked() < 3) {
              onBtnPress();
              setTimesClicked(timesClicked() + 1);
            } else {
              setShowButton(false);
              setTimesClicked(0);
              sendGameAction('btn_click');
            }
          }}
        >
          <div class="dot"></div>
        </button>
      </div>
    </div>
  </Show>
);

const randomPosition = () => ({
  x: randomInteger(5, 80),
  y: randomInteger(5, 80),
});

const [position, setPosition] = createSignal(randomPosition());
const [timesClicked, setTimesClicked] = createSignal(0);

const onBtnPress = () => {
  setPosition(randomPosition());
};

const actions = {
  press_btn: () => setShowButton(true),
  your_time_sec: (sec: number) => sendMsg(`My reaction time is ${sec}`),
  game_over: (total: number) => sendMsg(`Game over. Total time: ${total}`),
};

export const Game: IGame = {
  gameId: 'reaction',
  title: 'Reaction',
  imageUrl: '/img/speed.svg',
  rulesEl: rules,
  gameEl: game,
  onGameAction: (action, payload) => actions[action as keyof typeof actions](payload),
};
