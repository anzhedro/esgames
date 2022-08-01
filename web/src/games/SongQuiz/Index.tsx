import { Match, Show, Switch } from 'solid-js';
import { CircularCountdownTimer } from '../../components/CircularCountDownTimer';
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

const GameComponent = () => (
  <div class="quiz-container">
    <Switch>
      <Match when={gameState() === 'pick_song' || gameState() === 'confirm_song_title'}>
        <div class="timer">
          <CircularCountdownTimer time={timeToPick()} />
        </div>
      </Match>
      <Match when={gameState() === 'round_play'}>
        <div class="timer">
          <CircularCountdownTimer time={timeToGuess()} />
        </div>
      </Match>
    </Switch>

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
