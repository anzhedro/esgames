import { Show } from 'solid-js';
import { setTableState, startGame, currentGame } from '../store/room';
import { iAmHost } from '../store/state';

export const GameRules = () => (
  <>
    <div class="header" style={{ justifyContent: 'space-around' }}>
      <button onClick={() => setTableState('game_rules')}>ПРАВИЛА</button>

      <Show when={currentGame()?.settingsEl}>
        <button onClick={() => setTableState('game_settings')}>НАСТРОЙКИ</button>
      </Show>
    </div>
    <div class="content game_rules">{currentGame()!.rulesEl}</div>
    <div class="footer">
      <button onClick={() => setTableState('game_select')}>НАЗАД</button>

      <Show when={iAmHost()} fallback={<div></div>}>
        <button onClick={() => startGame()}>НАЧАТЬ</button>
      </Show>
    </div>
  </>
);
