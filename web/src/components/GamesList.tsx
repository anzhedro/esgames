import { For } from 'solid-js';
import { useParams } from 'solid-app-router';
import { setCurrentGame, setTableState } from '../store/room';
import { copyToClipboard } from '../utils/helpers';
import { Spinner } from './Spinner';

import { IGame } from '../utils/types';
import { Games } from '../games/games';

export const GamesList = () => {
  const params = useParams();
  return (
    <>
      <div class="header">
        <button>ИГРЫ</button>
      </div>

      <div class="content">
        <For each={Games} fallback={<Spinner />}>
          {(game: IGame) => (
            <div
              class="game_card"
              onClick={() => {
                setCurrentGame(game);
                setTableState('game_rules');
              }}
            >
              <img src={game.imageUrl} />
              <p>{game.title}</p>
            </div>
          )}
        </For>
      </div>
      <div class="footer">
        <button
          onClick={() =>
            copyToClipboard(`${window.location.host}/room/${params.id}`)
          }
        >
          ПРИГЛАСИТЬ
        </button>
      </div>
    </>
  );
};
