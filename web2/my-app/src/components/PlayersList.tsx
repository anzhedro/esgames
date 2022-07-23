import { createSignal, For, Show, Accessor } from "solid-js";
import { handleKick, users } from "../store/room";
import { IPlayer } from "../utils/types";
import { Avatar } from "./Avatar";

export const PlayersList = () => {
  const [isShowKickButton, setShowKickButton] = createSignal(false);

  return (
    <div>
      <For each={users()} fallback={<div>Loading...</div>}>
        {(user: IPlayer, index: Accessor<number>) => (
          <div
            classList={{ player: true, "bg-dark": +index % 2 !== 0 }}
            onMouseOver={() => setShowKickButton(true)}
            onMouseLeave={() => setShowKickButton(false)}
            onClick={() => console.log(isShowKickButton)}
          >
            <Avatar avatar={user.avatar} isHost={user.is_host} />
            <p>{user.name}</p>

            <Show when={isShowKickButton()} fallback={<div></div>}>
              <button class="kick_button" onClick={() => handleKick(user.name)}>
                <img src="/img/kick.svg" />
              </button>
            </Show>
          </div>
        )}
      </For>
    </div>
  );
};
