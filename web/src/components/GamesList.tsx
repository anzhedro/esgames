import { For } from 'solid-js';
import { useParams } from 'solid-app-router';
import { setCurrentGame } from '../store/room';
import { Spinner } from './Spinner';

import { IGame } from '../utils/types';
import { Games } from '../games/games';

export const GamesList = () => {
  const params = useParams();
  return (
    <>
      <div class="header">Welcome to room "{params.id}"</div>
      <div class="content">
        <For each={Games} fallback={<Spinner />}>
          {(game: IGame) => (
            <div class="game_card" onClick={() => setCurrentGame({ state: 'pregame', game })}>
              <img src={game.imageUrl} />
              <p>{game.title}</p>
            </div>
          )}
        </For>
      </div>
    </>
  );
};
