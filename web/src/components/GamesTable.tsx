import { Match, Switch } from 'solid-js';
import { GamesList } from './GamesList';
import { GameRules } from './GameRules';
import { GameSettings } from './GameSettings';
import { tableState, currentGame } from '../store/room';

export const GamesTable = () => (
  <div class="games_table">
    <div class="games_table_wrapper">
      <Switch fallback={''}>
        <Match when={tableState() === 'game_select'}>
          <GamesList />
        </Match>

        <Match when={tableState() === 'game_settings'}>
          <GameSettings />
        </Match>

        <Match when={tableState() === 'game_rules'}>
          <GameRules />
        </Match>

        <Match when={tableState() === 'game_play'}>
          <div class="game_play">{currentGame()!.gameEl}</div>
        </Match>
      </Switch>
    </div>
  </div>
);
