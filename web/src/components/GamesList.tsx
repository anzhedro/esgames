import { nanoid } from "nanoid";
import React from "react";
import { copyToClipboard } from "../utils/helpers";

export const GamesList = ({ games, id, setMode }) => {
  return (
    <>
      <div className="header">
        <button>ИГРЫ</button>
        <button>НАСТРОЙКИ</button>
      </div>

      <div className="content">
        {games.map((game) => (
          <div key={nanoid()} className="game_card" onClick={() => setMode("rules")}>
            <img src={game.image} />
            <p>{game.title}</p>
          </div>
        ))}
      </div>
      <div className="footer">
        <button onClick={() => copyToClipboard("localhost:3000/lobby/" + id)}>ПРИГЛАСИТЬ</button>
      </div>
    </>
  );
};
