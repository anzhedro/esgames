import { nanoid } from "nanoid";
import React from "react";
import { Avatar } from "./Avatar";
import players from '../utils/players.json'

export const Players = ({ isScoreShow = false }) => {
  return (
    <div className="players">
      <div className="header">
        <p>
          ИГРОКОВ: <span>{players.length}</span>
        </p>
      </div>
      <div className="content">
        {players.map((player, index) => (
          <div key={nanoid() } className={index & 2 ? "player bg-dark" : "player "}>
          <Avatar avatarId={player.avatarId} type={player.type} />
          <p>{player.name}</p>
        </div>
        ))}
      </div>
      <div className="footer">
        <button className="active">ИГРОКИ</button>
        <button disabled>ЗРИТЕЛИ</button>
      </div>
    </div>
  );
};
