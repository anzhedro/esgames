import { Show, For } from 'solid-js';
import { roundStats } from './store';
import { UserStat } from './types';

export const RoundResults = () => (
  <Show when={roundStats().length > 0}>
    <div class="round_results">
      <div class="results__row">
        <div class="user">User</div>
        <div class="guessedId"></div>
        <div class="roundScore">round</div>
        <div class="totalScore">total</div>
      </div>
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
