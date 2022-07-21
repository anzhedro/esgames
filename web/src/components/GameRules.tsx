import React from "react";
import { store } from "../store/store";
import { AliasRules } from "./AliasRules";

export const GameRules = ({ setMode }) => {
  return (
    <>
      <div className="header" style={{justifyContent: 'space-around'}}>
        <button onClick={()=> setMode('rules')}>ПРАВИЛА</button>
        <button onClick={()=> setMode('settings')}>НАСТРОЙКИ</button>
      </div>
      <div className="content game_rules">
        <AliasRules />
      </div>
      <div className="footer">
        <button onClick={() => setMode("select")}>НАЗАД</button>
        <button onClick={() => setMode("play")}>НАЧАТЬ</button>
      </div>
    </>
  );
};
