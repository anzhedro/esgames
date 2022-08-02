import { Match, Show, Switch } from 'solid-js';
import { CircularCountdownTimer } from '../../components/CircularCountdownTimer';
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
  showHint,
} from './store';

const Timer = () => (
  <Switch>
    <Match when={gameState() === 'pick_song' || gameState() === 'confirm_song_title'}>
      <CircularCountdownTimer time={timeToPick()} />
    </Match>
    <Match when={gameState() === 'round_play'}>
      <CircularCountdownTimer time={timeToGuess()} />
    </Match>
  </Switch>
);

const PickSong = () => (
  <div class="pick_song">
    <div class="pick__theme">
      The theme is: <strong>{currentTopic()}</strong>
    </div>
    <h2 class="title">Pick a song for others to guess:</h2>
    <SongSearch />
    <Show when={selectedSong()}>{(song) => <SongPreview song={song} />}</Show>
  </div>
);

const SongQuizConfirm = () => (
  <div class="confirm">
    <div class="pick__theme">
      The theme is: <strong>{currentTopic()}</strong>
    </div>
    <div class="title">Confirm the name other players will guess:</div>
    <Show when={selectedSong()}>{(song) => <SongTitleConfirm song={song} />}</Show>
  </div>
);

const Waiting = () => <div class="title">Waiting for other players... </div>;

const RoundPreload = () => (
  <>
    <div class="pick__theme">
      The theme is: <strong>{currentTopic()}</strong>
    </div>
    <div class="title">
      Round {curRound()} - {rounds()[curRound()].user} picked this song!
    </div>
    <RoundResults />
    <Spinner />
  </>
);

const RoundPlay = () => (
  <>
    <div class="pick__theme">
      The theme is: <strong>{currentTopic()}</strong>
    </div>
    <div class="title">
      Round {curRound()} - {rounds()[curRound()].user} picked this song!
    </div>
    <div class="title">HERE</div>
    <Show
      when={showHint()}
      fallback={
        <div class="title">
          {rounds()
            [curRound()].want.split(' ')
            .map((word) =>
              word
                .split('')
                .map((ch) => (['!', '?', '.', ',', '(', ')'].includes(ch) ? ch : '_'))
                .join('')
            )
            .join(' ')}
        </div>
      }
    >
      <div class="title">
        {rounds()
          [curRound()].want.split(' ')
          .map((word) =>
            word
              .split('')
              .map((ch, i) => (['!', '?', '.', ',', '(', ')'].includes(ch) || !i ? ch : '_'))
              .join('')
          )
          .join(' ')}
      </div>
    </Show>
    <div class="title">AfTER</div>
    {rounds()[curRound()].audioEl}
  </>
);

const GameComponent = () => (
  <div class="quiz-container">
    <Timer />

    <Switch>
      <Match when={gameState() === 'pick_song'}>
        <PickSong />
      </Match>
      <Match when={gameState() === 'confirm_song_title'}>
        <SongQuizConfirm />
      </Match>
      <Match when={gameState() === 'waiting_for_other_players'}>
        <Waiting />
      </Match>
      <Match when={gameState() === 'round_preload'}>
        <RoundPreload />
      </Match>
      <Match when={gameState() === 'round_play'}>
        <RoundPlay />
      </Match>
    </Switch>
  </div>
);

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
