import { observer } from "mobx-react-lite";
import { arrayExtensions } from "mobx/dist/internal";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { store } from "../store/store";
import { IPlayer } from "../utils/types";
import { Avatar } from "./Avatar";

export const PlayersList = observer(() => {
  const [isShowKickButton, setShowKickButton] = useState(false);

  return (
    <div>
      {store.room.users.map((user: IPlayer, index: number) => (
        <div
          key={nanoid()}
          className={index & 2 ? "player bg-dark" : "player "}
          onMouseOver={() => setShowKickButton(true)}
          onMouseLeave={() => setShowKickButton(false)}
          onClick={() => console.log(isShowKickButton)}
        >
          <Avatar avatar={user.avatar} isHost={user.is_host} />
          <p>{user.name}</p>

          {isShowKickButton && store.auth.isHost && (
            <button className="kick_button" onClick={() => store.room.handleKick(user.name)}>
              <img src="/img/kick.svg" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
});
