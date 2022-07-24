import { createEffect, createSignal, For, Show, Accessor } from "solid-js";
import { handleKick, users } from "../store/room";
import { IPlayer } from "../utils/types";
import { Avatar } from "./Avatar";
import {name as CurrentUsername }from "../store/auth";

export const PlayersList = () => {
  const [iAmHost, setIAmHost] = createSignal(false);
  createEffect(() => {
    setIAmHost(users().find(user => user.name === CurrentUsername())?.is_host === true);
  });
  
  return (
    <div>
      <For each={users()} fallback={<div>Loading...</div>}>
        {(u: IPlayer) => (
          <div classList={{ player: true, host: u.is_host }}>
            <Avatar avatar={u.avatar} isHost={u.is_host} />
            <p>{u.name}</p>
            <Show when={CurrentUsername() === u.name}>
              <p class="you">you</p>
            </Show>
            <Show when={iAmHost()}>
            <button class="kick_button" onClick={() => handleKick(u.name)}>
              <img src="/img/kick.svg" />
            </button>
            </Show>
          </div>
        )}
      </For>
    </div>
  );
};
