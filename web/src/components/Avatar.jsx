import React from "react";
import { randomInteger } from "../utils/helpers";

export const Avatar = ({
  avatarId = randomInteger().toString(),
  type = "player",
}) => {
  return (
    <div className="avatar">
      {type === "host" ? (
        <img src="/img/crown.svg" className="host-indicator" />
      ) : (
        false
      )}
      <img src={`/img/${avatarId}.jpg`} alt="avatar" />
    </div>
  );
};
