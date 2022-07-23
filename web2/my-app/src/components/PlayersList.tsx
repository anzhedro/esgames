import { nanoid } from "nanoid";
import { createSignal, Show } from "solid-js";
import { handleKick, users } from "../store/room";
import { IPlayer } from "../utils/types";
import { Avatar } from "./Avatar";

export const PlayersList = () => {
  const [isShowKickButton, setShowKickButton] = createSignal(false);

  return (
    <div>
      {users.map((user: IPlayer, index: number) => (
        <div
          class={index & 2 ? "player bg-dark" : "player "}
          onMouseOver={() => setShowKickButton(true)}
          onMouseLeave={() => setShowKickButton(false)}
          onClick={() => console.log(isShowKickButton)}
        >
          <Avatar avatar={user.avatar} isHost={user.is_host} />
          <p>{user.name}</p>

          {/* show */}
          <Show when={isShowKickButton()} fallback={<div>Loading...</div>}>
            <button class="kick_button" onClick={() => handleKick(user.name)}>
              <img src="/img/kick.svg" />
            </button>
          </Show>
        </div>
      ))}
    </div>
  );
};
