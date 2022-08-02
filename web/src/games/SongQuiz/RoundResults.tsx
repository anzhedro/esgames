import { Show, For } from 'solid-js';
import { roundStats } from './store';
import { UserStat } from './types';

export const RoundResults = () => (
  <Show when={roundStats().length > 0}>
    <div class="round_results">
      <For each={roundStats()}>
        {(stat: UserStat) => (
          <div class="results__row">
            <div class="user">{stat.user}</div>
            <div class="guessedId">{stat.guessedIn ? `${stat.guessedIn} ms` : '-'}</div>
            <div class="roundScore">{stat.roundScore}</div>
            <div class="totalScore">{stat.totalScore}</div>
          </div>
        )}
      </For>
    </div>
  </Show>
);
