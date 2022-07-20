import React from "react";
import { randomInteger } from "../utils/helpers";

export const Avatar = ({ avatar = randomInteger(), isHost = false }) => {
  return (
    <div className="avatar">
      {isHost ? <img src="/img/crown.svg" className="host-indicator" /> : false}
      <img src={`/img/${avatar}.jpg`} alt="avatar.jpg" />
    </div>
  );
};
