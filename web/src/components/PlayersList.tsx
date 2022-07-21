import { observer } from "mobx-react-lite";
import { nanoid } from "nanoid";
import React from "react";
import { store } from "../store/store";
import { IPlayer } from "../utils/types";
import { Avatar } from "./Avatar";

export const PlayersList = observer(() => {
  return (
    <div>
      {store.room.users.map((user: IPlayer, index: number) => (
        <div key={nanoid()} className={index & 2 ? "player bg-dark" : "player "}>
          <Avatar avatar={user.avatar} isHost={user.is_host} />
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
});
