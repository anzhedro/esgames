import { createSignal, For, Show } from "solid-js";
import { gameSettingsOptinos, setTableState, startGame } from "../store/room";
import { iAmHost } from "../store/state";

const [difficultyOptions, setDifficultyOptions] = createSignal(["Легко", "Средне", "Сложно"]);
const [currentDifficulty, setCurrentDifficulty] = createSignal(difficultyOptions()[0]);
const [roundsCount, setRoundsCount] = createSignal(3);

const roundsCountIncrement = () => {
  if (roundsCount() < 100) {
    setRoundsCount(roundsCount() + 1);
  }
};

const roundsCountDecrement = () => {
  if (roundsCount() > 1) {
    setRoundsCount(roundsCount() - 1);
  }
};

export const RoundTime = () => {
  return (
    <div>
      <h3>Время раунда</h3>
      <input type="number" />
    </div>
  );
};

export const RoundCount = () => {
  return (
    <div class="round_count">
      <h3>Количество раундов</h3>
      <div class="row">
        <button onclick={roundsCountIncrement}>+</button>
        <button onclick={roundsCountDecrement}>-</button>
        <p>{roundsCount()}</p>
      </div>
    </div>
  );
};

export const Difficulty = (props: any) => {
  const [isSelectOpen, setIsSelectOpen] = createSignal(false);

  return (
    <div>
      <h3>Сложность</h3>
      <div class="select">
        <div class="currentOption option" onclick={() => setIsSelectOpen(!isSelectOpen())}>
          {currentDifficulty()}
        </div>

        <div class="options">
          <Show when={isSelectOpen()}>
            <For each={difficultyOptions()}>
              {(option) => (
                <div
                  onclick={() => {
                    setCurrentDifficulty(option);
                    setIsSelectOpen(false);
                  }}
                  class="option"
                >
                  {option}
                </div>
              )}
            </For>
          </Show>
        </div>
      </div>
    </div>
  );
};

export const TeamsCount = () => {
  const [currentCount, setCurrentCount] = createSignal(gameSettingsOptinos().teamsCount);

  return (
    <div class="commands_count">
      <h3>Количество команд</h3>

      <div class="row">
        <For each={gameSettingsOptinos().teamsCount} fallback={<div>Loading...</div>}>
          {(count) => (
            <button class={currentCount() == count ? "active" : ""} onClick={() => setCurrentCount(count)}>
              {count}
            </button>
          )}
        </For>
      </div>
    </div>
  );
};

export const GameSettings = () => {
  return (
    <>
      <div class="header" style={{ justifyContent: "space-around" }}>
        <button onClick={() => setTableState("game_rules")}>ПРАВИЛА</button>

        <Show when={Object.keys(gameSettingsOptinos()).length === 0}>
          <button onClick={() => setTableState("game_settings")}>НАСТРОЙКИ</button>
        </Show>
      </div>
      <div class="content game_settings">
        <h2>Настройки игры Alias</h2>
        <Show when={"roundTime" in gameSettingsOptinos()}>
          <RoundTime />
        </Show>

        <Show when={"roundCount" in gameSettingsOptinos()}>
          <RoundCount />
        </Show>

        <Show when={"difficulty" in gameSettingsOptinos()}>
          <Difficulty />
        </Show>

        <Show when={"teamsCount" in gameSettingsOptinos()}>
          <TeamsCount />
        </Show>
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
