import { Component, Match, Switch } from 'solid-js';
import { GamesList } from './GamesList';
import { Pregame } from './Pregame';
import { currentGame as cur, getGame } from '../store/room';

export const GamesTable : Component = () => {
  return <div class="games_table">
    <div class="games_table_wrapper">
      <Switch fallback={''}>
        <Match when={cur().state === 'lobby'}>
          <GamesList />
        </Match>

        <Match when={cur().state === 'pregame'}>
          <Pregame game={getGame(cur())!}/>
        </Match>
        
        <Match when={cur().state === 'playing'}>
          <div class="game_play">{getGame(cur())!.gameEl}</div>
        </Match>
      </Switch>
    </div>
  </div>
};