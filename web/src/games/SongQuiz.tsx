import { createSignal, onCleanup, createEffect, For, Show, createResource, Suspense, Match, Switch } from 'solid-js';
import { IGame } from '../utils/types';
import { Spinner } from '../components/Spinner';
import { sendGameAction } from '../store/room';

const songQuizTopics = [
  'No theme',
  'Custom',
  'Lockdown',
  'Disney',
  'TV Shows',
  'Film Soundtracks',
  'Cartoon Themes',
  'Songs with a name in them',
  'Songs containing a place/city/country',
  'Colours',
  'Videogames',
  '80s',
  '90s',
  '00s',
  'Christmas',
  'Musicals',
  'Covers',
  'Songs where the name is never mentioned in the lyrics',
  'Songs in a different language',
  'Game Show Theme Songs',
  'Rap',
  'Classical music',
  'One-word artist names',
];

const [currentTopic, setCurrentTopic] = createSignal(songQuizTopics[0]);
const Topics = () => (
  <div>
    <h3>Тема игры</h3>
    <div>
      <select
        name="cellsWide"
        onChange={(e) => setCurrentTopic(e.currentTarget.value)}
      >
        <For each={songQuizTopics}>
          {(topic) => <option value={topic}>{topic}</option>}
        </For>
      </select>
      <Show
        when={
          currentTopic() === 'Custom' ||
          !songQuizTopics.includes(currentTopic())
        }
      >
        <input
          type="text"
          onKeyUp={(e) => setCurrentTopic(` ${e.currentTarget.value}`)}
        />
      </Show>
    </div>
  </div>
);

const [timeToPick, setTimeToPick] = createSignal(60);
const [timeToGuess, setTimeToGuess] = createSignal(20);

const settings = () => (
  <>
    <div>
      <h3>Время на выбор песни</h3>
      <input
        type="number"
        value="60"
        min="0"
        max="120"
        onChange={(e) => setTimeToPick(+e.currentTarget.value)}
      />
    </div>
    <div>
      <h3>Время для ответа</h3>
      <input
        type="number"
        value="20"
        min="1"
        max="30"
        onChange={(e) => setTimeToGuess(+e.currentTarget.value)}
      />
    </div>
    <Topics />
  </>
);

const rules = () => <p>Угадай мелодию.</p>;

interface SongItem {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  previewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  discCount: number;
  discNumber: number;
  trackCount: number;
  trackNumber: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  isStreamable: boolean;
}

interface fetchMusicResponse {
  results: SongItem[];
  resultCount: number;
}

const fetchMusic = async (searchTerm: string): Promise<fetchMusicResponse> =>
  (
    await fetch(
      `https://itunes.apple.com/search?${new URLSearchParams({
        term: searchTerm,
        limit: '20',
        country: 'gb',
        media: 'music',
        entity: 'musicTrack',
        explicit: 'yes',
      })}`
    )
  ).json();

const [searchTerm, setSearchTerm] = createSignal('');
const [querySearchTerm, setQuerySearchTerm] = createSignal<string>();
const [selectedSong, setSelectedSong] = createSignal<SongItem | null>(null);


const [userGuess, setUserGuess] = createSignal('');

const SongSearch = () => {
  const [songs] = createResource(querySearchTerm, fetchMusic);
  return (
    <div class="quiz-game">
      <form
        class="quiz-game__pick__search"
        onSubmit={(e) => e.preventDefault()}
      >
        <div class="wrapper">
          <input
            class="input__field"
            type="text"
            placeholder="Song / artist"
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
          />
        </div>

        <button
          class="button --secondary "
          onClick={() => {
            setQuerySearchTerm(searchTerm);
            setSelectedSong(null);
          }}
        >
          <span class="button__label --secondary">Search</span>
        </button>
      </form>
      <Suspense fallback={<Spinner />}>
        <Show when={songs()} fallback={<div></div>}>
          <div class="quiz-game__pick__results">
            <For each={songs()!.results}>
              {(song) => (
                <div
                  classList={{
                    selected: selectedSong() === song,
                    'quiz-game__pick__results__row': true,
                  }}
                  onClick={() => {
                    if (selectedSong() === song) return;
                    setSelectedSong(null);
                    setSelectedSong(song);
                    // setGameState("pick_song_player");
                  }}
                >
                  <span class="quiz-game__pick__results__row__main">
                    {song.trackName}
                  </span>{' '}
                  - {song.artistName}
                </div>
              )}
            </For>
          </div>
        </Show>
      </Suspense>
    </div>
  );
};

const SongPreview = () => (
  <>
    <div class="quiz-game__player">
      <div
        class="quiz-game__pick__song__image"
        style={{
          'background-image': `url(${selectedSong()!.artworkUrl100})`,
          height: '100px',
          width: '100px',
        }}
      ></div>
      <div class="quiz-game__pick__song__player__content">
        <div class="quiz-game__pick__song__player__content__top">
          <div class="quiz-game__pick__song__name">
            {selectedSong()!.trackName}
          </div>
          <div class="quiz-game__pick__song__details">
            {selectedSong()!.artistName}
          </div>
          <audio
            class="quiz-game__pick__song__audio"
            controls={true}
            style={{ height: '40px', width: '300px' }}
          >
            <source src={selectedSong()!.previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
    <div class="quiz-game__pick__song__player__content__bottom">
      <button
        class="button --primary "
        onClick={() => {
          setGameState('confirm_song_title');
          setUserGuess(selectedSong()!.trackName);
        }}
      >
        <span class="button__label --primary">Pick Song</span>
      </button>
    </div>
  </>
);

const SongTitleConfirm = () => (
  <div class="quiz-game__chosen__song">
    <div class="quiz-game__pick__stage">
      <div class="input__container quiz-game__pick__song__edit-name">
        <input
          class="input__field"
          type="text"
          placeholder="Song name"
          value={selectedSong()!.trackName}
          onChange={(e) => setUserGuess(e.currentTarget.value)}
        />
      </div>
      <div class="buttons">
        <button
          class="button --link "
          onClick={() => setGameState('pick_song')}
        >
          Back
        </button>
        <button
          class="button --primary "
          onClick={() => {
            clearTimeout(pickTimeout);
            clearInterval(secondsTicker);
            pickTimeout = undefined;
            secondsTicker = undefined;
            sendGameAction("picked_song", {
              want: userGuess(),
              pic: selectedSong()!.artworkUrl100,
              audio: selectedSong()!.previewUrl,
              track: selectedSong()!.trackName,
              artist: selectedSong()!.artistName,
            });
            setGameState('waiting_for_other_players');
          }}
        >
          Choose this song!
        </button>
      </div>
    </div>
  </div>
);

const [gameState, setGameState] = createSignal("");


const [timeLeft, setTimeLeft] = createSignal(60);
const [curRound, setCurRound] = createSignal(0);
const [rounds, setRounds] = createSignal<UserSong[]>([]);


const game = () => {
  return (
    <div class="quiz-container">

      <div class="timer">{timeLeft() >= 0 ? timeLeft() : 0}</div>
      <Switch>
        <Match when={gameState() === 'pick_song'}>
          <div class="quiz-game__pick__theme">The theme is: <strong>{currentTopic()}</strong></div>
          <h2 class="title">Pick a song for others to guess:</h2>
          <SongSearch />
          <Show when={selectedSong()}>
            <SongPreview />
          </Show>
        </Match>
        <Match when={gameState() === 'confirm_song_title'}>
          <div class="quiz-game__pick__theme">The theme is: <strong>{currentTopic()}</strong></div>
          <div class="title">Confirm the name other players will guess:</div>
          <SongTitleConfirm />
        </Match>
        <Match when={gameState() === 'waiting_for_other_players'}>
          <div class="title">Waiting for other players... </div>
        </Match>
        <Match when={gameState() === 'round_preload'}>
          <div class="quiz-game__pick__theme">The theme is: <strong>{currentTopic()}</strong></div>
          <div class="title">Round {curRound()} - {rounds()[curRound()].user} picked this song!</div>
          <RoundResults />
          <Spinner />
        </Match>
        <Match when={gameState() === 'round_play'}>
          <div class="quiz-game__pick__theme">The theme is: <strong>{currentTopic()}</strong></div>
          <div class="title">Round {curRound()} - {rounds()[curRound()].user} picked this song!</div>
          {rounds()[curRound()].audioEl}
        </Match>
      </Switch>
    </div>
  )
};

const [roundStats, setRoundStats] = createSignal<UserStat[]>([]);

const RoundResults = () =>
  <Show when={roundStats().length > 0}>
    <div class="round_results">
      <For each={roundStats()}>
        {(stat) => (<div class="results__row">
          <div class="results__row__user">{stat.user}</div>
          <div class="results__row__guessedId">{stat.guessedIn ? `${stat.guessedIn} ms` : "-"}</div>
          <div class="results__row__roundScore">{stat.roundScore}</div>
          <div class="results__row__totalScore">{stat.totalScore}</div>
        </div>)}
      </For>
    </div>
  </Show>

// Kinds of messages we can send to the backend:
// * picked_song
// * ready
// * giveup

let pickTimeout: number | undefined = undefined;
let guessTimeout: number | undefined = undefined;
let secondsTicker: number | undefined = undefined;

interface UserSong {
  user: string;
  want: string;
  pic: string;
  audio: string;
  track: string;
  artist: string;
  audioEl?: HTMLAudioElement;
}

interface Settings {
  topic: string;
  timeToPick: number;
  timeToGuess: number;
}

interface RoundStats {
  users: UserStat[];
}

interface UserStat {
  user: string;
  guessedIn?: number;
  roundScore: number;
  totalScore: number;
}

const actions = {
  settings(settings: Settings) {
    // Reset game state 
    setRoundStats([]);
    setRounds([]);
    setCurRound(0);
    setUserGuess("");
    setSelectedSong(null);
    setSearchTerm("");
    setQuerySearchTerm("");
    
    setCurrentTopic(settings.topic);
    setTimeToPick(settings.timeToPick);
    setTimeToGuess(settings.timeToGuess);

    setTimeLeft(settings.timeToPick);

    setGameState("pick_song");
    pickTimeout = setTimeout(() => {
      if (gameState() === "waiting_for_other_players") return;
      sendGameAction("pick_time_out");
    }, settings.timeToPick * 1000);
    secondsTicker = setInterval(() => { setTimeLeft(timeLeft() - 1) }, 1000);
  },
  rounds(songs: UserSong[]) {
    setCurRound(0);
    songs = songs.map((e, i) => {
      e.audioEl = new Audio(e.audio);
      e.audioEl.preload = "auto";
      if (i === 0) {
        e.audioEl.oncanplaythrough = () => setTimeout(()=> sendGameAction("ready"), 5000);
        e.audioEl.load();
      }
      return e;
    });
    setRounds(songs);
    setGameState("round_preload");
  },
  play() {
    setGameState("round_play");
    rounds()[curRound()].audioEl!.play();
    guessTimeout = setTimeout(() => {
      sendGameAction("giveup");
    }, timeToGuess() * 1000);
  },
  round_end(stats: RoundStats) {
    if (guessTimeout) {
      clearTimeout(guessTimeout);
      guessTimeout = undefined;
    }
    setRoundStats(stats.users);
    setGameState("round_preload");
    if (curRound() + 1 < rounds().length) {
      setCurRound(curRound() + 1);
      const el = rounds()[curRound()].audioEl!;
      el.oncanplaythrough = () => setTimeout(()=> sendGameAction("ready"), 5000);
      el.load();
    }
  },
  game_over() { },
};

export const Game: IGame = {
  gameId: 'songquiz',
  title: 'SongQuiz',
  imageUrl: '/img/song_heart.svg',
  settingsEl: settings,
  rulesEl: rules,
  gameEl: game,
  getSettings: () => ({
    timeToPick: timeToPick(),
    timeToGuess: timeToGuess(),
    topic: currentTopic(),
  }),
  onGameAction: (action, payload) => actions[action as keyof typeof actions](payload),
};
