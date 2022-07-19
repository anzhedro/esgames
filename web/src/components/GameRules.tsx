import React from "react";

export const GameRules = ({ setMode }) => {
  return (
    <>
      <div className="header">
        <button>ИГРЫ</button>
        <button>НАСТРОЙКИ</button>
      </div>
      <div className="content"></div>
      <div className="footer">
        <button onClick={() => setMode("select")}>НАЗАД</button>
        <button onClick={() => setMode("play")}>НАЧАТЬ</button>
      </div>
    </>
  );
};
