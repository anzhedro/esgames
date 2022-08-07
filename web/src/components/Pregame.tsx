import { children, Component, createSignal, Show, splitProps, Switch, Match } from 'solid-js';
import { setCurrentGame, startGame } from '../store/room';
import { iAmHost } from '../store/state';
import { IGame } from '../utils/types';

export const Pregame: Component<{ game: IGame }> = (p) => {
  const [mode, setMode] = createSignal<'rules' | 'settings'>('rules');
  return <>
    <div class="header">
      <h2> Game "{p.game.title}"</h2>
    </div>
    <Switch>
      <Match when={mode() === "rules"}>
        <div class="content game_rules">{p.game.rulesEl}</div>
      </Match>
      <Match when={mode() === "settings" && p.game.settingsEl}>
        <div class="content game_settings">{p.game.settingsEl!}</div>
      </Match>
    </Switch>
    <div class="footer">
      <Switch>
        <Match when={!iAmHost()}><div></div></Match>
        <Match when={p.game.settingsEl && mode() === 'rules'}>
          <div></div>
          <button onClick={() => setMode('settings')}>Настройки</button>
        </Match>
        <Match when={mode() === 'settings'}>
          <button onClick={() => setMode('rules')}>Назад</button>
          <button onClick={() => startGame()}>Начать игру</button>
        </Match>
        <Match when={!p.game.settingsEl}>
          <div></div>
          <button onClick={() => startGame()}>Начать игру</button>
        </Match>
      </Switch>
    </div>
  </>;
};
