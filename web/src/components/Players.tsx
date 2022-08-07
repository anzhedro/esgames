import { useParams } from 'solid-app-router';
import { Component, JSXElement, Show } from 'solid-js';
import { currentGame, setCurrentGame, users } from '../store/room';
import { copyToClipboard } from '../utils/helpers';

export const Players: Component<{ children: JSXElement }> = (props) => {
  const params = useParams();

  return (
    <div class="players">
      <div class="header">
        <p>
          {' '}
          ИГРОКОВ: <span>{users().length}</span>{' '}
        </p>
      </div>
      <div class="content">{props.children}</div>
      <div class="footer">
        <button onClick={() => copyToClipboard(`${window.location.host}/room/${params.id}`)}>Room link</button>
        <Show when={currentGame().state !== 'lobby'}>
          <button onClick={() => setCurrentGame({ state: 'lobby' })}>Lobby</button>
        </Show>
      </div>
    </div>
  );
};
