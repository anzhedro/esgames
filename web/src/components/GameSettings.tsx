import { createSignal, For, Show } from "solid-js";
import { iAmHost } from "../store/state";
import { CommandsCountProps, DifficultyProps, GameSettingsProps } from "../utils/types";

export const RountTime = () => {
  return (
    <div>
      <h3>Время раунда</h3>
      <input type="number" />
    </div>
  );
};

export const RoundCount = () => {
  return (
    <div>
      <h3>Количество раундов</h3>
      <input type="number" />
    </div>
  );
};

export const Difficulty = (props: DifficultyProps) => {
  const [isSelectOpen, setIsSelectOpen] = createSignal(false);

  return (
    <div>
      <h3>Сложность</h3>
      <div class="select">
        <div class="currentOption">{props.option.currentOption}</div>

        <Show when={isSelectOpen()} fallback={<div>Loading...</div>}>
          <For each={props.option.options} fallback={<div>Loading...</div>}>
            {(option) => <div class="option">{option}</div>}
          </For>
        </Show>
      </div>
    </div>
  );
};

export const CommandsCount = (props: CommandsCountProps) => {
  const [currentCount, setCurrentCount] = createSignal(props.counts[0]);

  return (
    <div>
      <h3>Количество команд</h3>

      <For each={props.counts} fallback={<div>Loading...</div>}>
        {(count) => (
          <button class={currentCount() == count ? "active" : ""} onClick={() => setCurrentCount(count)}>
            {count}
          </button>
        )}
      </For>
    </div>
  );
};

export const GameSettings = (props: GameSettingsProps) => {
  return (
    <>
      <div class="header" style={{ justifyContent: "space-around" }}>
        <button onClick={() => props.setMode("rules")}>ПРАВИЛА</button>
        <button onClick={() => props.setMode("settings")}>НАСТРОЙКИ</button>
      </div>
      <div class="content game_settings">
        <h2>Настройки игры Alias</h2>
        <RountTime />
        <RoundCount />
        <Difficulty option={{ currentOption: "Легко", options: ["Легко", "Средне", "Сложно"] }} />
        <CommandsCount counts={[2, 3, 4]} />
      </div>
      <div class="footer">
        <button onClick={() => props.setMode("select")}>НАЗАД</button>

        <Show when={iAmHost()} fallback={<div>Loading...</div>}>
          <button onClick={() => props.setMode("play")}>НАЧАТЬ</button>
        </Show>
      </div>
    </>
  );
};
