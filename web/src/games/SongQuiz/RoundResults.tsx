import { Show, For } from 'solid-js';
import { roundStats } from './store';
import { UserStat } from './types';

export const RoundResults = () => (
  <Show when={roundStats().length > 0}>
    <div class="round_results">
      <For each={roundStats()}>
        {(stat: UserStat) => (
          <div class="results__row">
            <div class="results__row__user">{stat.user}</div>
            <div class="results__row__guessedId">{stat.guessedIn ? `${stat.guessedIn} ms` : '-'}</div>
            <div class="results__row__roundScore">{stat.roundScore}</div>
            <div class="results__row__totalScore">{stat.totalScore}</div>
          </div>
        )}
      </For>
    </div>
  </Show>
);
