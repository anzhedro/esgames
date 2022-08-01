import { Match, Show, Switch } from 'solid-js';
import { Spinner } from '../../components/Spinner';
import { IGame } from '../../utils/types';
import { RoundResults } from './RoundResults';
import { Rules } from './Rules';
import { Settings } from './Settings';
import { SongPreview } from './SongPreview';
import { SongSearch } from './SongSearch';
import { SongTitleConfirm } from './SongTitleConfirm';
import {
  gameState,
  currentTopic,
  selectedSong,
  timeToPick,
  timeToGuess,
  curRound,
  rounds,
  actions,
  timeLeft,
} from './store';

const GameComponent = () => (
  <div class="quiz-container">
    <div class="timer">{timeLeft() >= 0 ? timeLeft() : 0}</div>
    <Switch>
      <Match when={gameState() === 'pick_song'}>
        <div class="quiz-game__pick__theme">
          The theme is: <strong>{currentTopic()}</strong>
        </div>
        <h2 class="title">Pick a song for others to guess:</h2>
        <SongSearch />
        <Show when={selectedSong()}>{(song) => <SongPreview song={song} />}</Show>
      </Match>
      <Match when={gameState() === 'confirm_song_title'}>
        <div class="quiz-game__pick__theme">
          The theme is: <strong>{currentTopic()}</strong>
        </div>
        <div class="title">Confirm the name other players will guess:</div>
        <Show when={selectedSong()}>{(song) => <SongTitleConfirm song={song} />}</Show>
      </Match>
      <Match when={gameState() === 'waiting_for_other_players'}>
        <div class="title">Waiting for other players... </div>
      </Match>
      <Match when={gameState() === 'round_preload'}>
        <div class="quiz-game__pick__theme">
          The theme is: <strong>{currentTopic()}</strong>
        </div>
        <div class="title">
          Round {curRound()} - {rounds()[curRound()].user} picked this song!
        </div>
        <RoundResults />
        <Spinner />
      </Match>
      <Match when={gameState() === 'round_play'}>
        <div class="quiz-game__pick__theme">
          The theme is: <strong>{currentTopic()}</strong>
        </div>
        <div class="title">
          Round {curRound()} - {rounds()[curRound()].user} picked this song!
        </div>
        {rounds()[curRound()].audioEl}
      </Match>
    </Switch>
  </div>
);

// Kinds of messages we can send to the backend:
// * picked_song
// * ready
// * giveup

export const Game: IGame = {
  gameId: 'songquiz',
  title: 'SongQuiz',
  imageUrl: '/img/song_heart.svg',
  settingsEl: Settings,
  rulesEl: Rules,
  gameEl: GameComponent,
  getSettings: () => ({
    timeToPick: timeToPick(),
    timeToGuess: timeToGuess(),
    topic: currentTopic(),
  }),
  onGameAction: (action, payload) => actions[action as keyof typeof actions](payload),
};
