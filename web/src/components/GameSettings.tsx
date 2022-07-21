import { nanoid } from "nanoid";
import React from "react";
import { useState } from "react";
import { store } from "../store/store";

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

export const Difficulty = ({ option }: { option: { currentOption: string; options: string[] } }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  return (
    <div>
      <h3>Сложность</h3>
      <div className="select">
        <div className="currentOption">{option.currentOption}</div>
        {isSelectOpen
          ? option.options.map((option) => (
              <div className="option" key={nanoid()}>
                {option}
              </div>
            ))
          : false}
      </div>
    </div>
  );
};

export const CommandsCount = ({ counts }: { counts: number[] }) => {
  const [currentCount, setCurrentCount] = useState(counts[0]);

  return (
    <div>
      <h3>Количество команд</h3>
      {counts.map((el) => (
        <button className={currentCount == el ? "active" : ""} onClick={() => setCurrentCount(el)}>
          {el}
        </button>
      ))}
    </div>
  );
};

export const GameSettings = ({ setMode }: { setMode: (mode: string) => void }) => {
  return (
    <>
      <div className="header" style={{ justifyContent: "space-around" }}>
        <button onClick={() => setMode("rules")}>ПРАВИЛА</button>
        <button onClick={() => setMode("settings")}>НАСТРОЙКИ</button>
      </div>
      <div className="content game_settings">
        <h2>Настройки игры Alias</h2>
        <RountTime />
        <RoundCount />
        <Difficulty option={{ currentOption: "Легко", options: ["Легко", "Средне", "Сложно"] }} />
        <CommandsCount counts={[2, 3, 4]} />
      </div>
      <div className="footer">
        <button onClick={() => setMode("select")}>НАЗАД</button>
        {store.auth.isHost && <button onClick={() => setMode("play")}>НАЧАТЬ</button>}
      </div>
    </>
  );
};
