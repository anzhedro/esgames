import { createSignal } from 'solid-js';
import { sendGameAction } from '../../store/room';
import { Timer } from '../../utils/helpers';
import { RoundStats, Settings, SongItem, UserSong, UserStat } from './types';

const showAnswerTime = 3;

// State carried over between games.
const [currentTopic, setCurrentTopic] = createSignal('Custom');
const [timeToPick, setTimeToPick] = createSignal(60);
const [timeToGuess, setTimeToGuess] = createSignal(20);

// State cleared between games.
const [roundStats, setRoundStats] = createSignal<UserStat[]>([]);
const [rounds, setRounds] = createSignal<UserSong[]>([]);
const [curRound, setCurRound] = createSignal(0);
const [userGuess, setUserGuess] = createSignal('');
const [selectedSong, setSelectedSong] = createSignal<SongItem | null>(null);
const [searchTerm, setSearchTerm] = createSignal('');
const [querySearchTerm, setQuerySearchTerm] = createSignal<string>();
export const [showHint, setShowHint] = createSignal<boolean>(false);
const [gameState, setGameState] = createSignal<
  'pick_song' | 
  'round_preload' |
  'round_play' |
  'show_answer' |
  'confirm_song_title' |
  'waiting_for_other_players' |
  undefined
>(undefined);
// Storage for active timers (returned by setTimeout()).
const pickTimer = new Timer();
const guessTimer = new Timer();
const hintTimer = new Timer();
const preloadTimer = new Timer();
const audioLoadedTimer = new Timer(); // send game action "ready" to server in 5s after audio loaded

function resetGameState() {
  setGameState(undefined);
  setRoundStats([]);
  setRounds([]);
  setCurRound(0);
  setUserGuess('');
  setSelectedSong(null);
  setSearchTerm('');
  setQuerySearchTerm('');
  setShowHint(false);
  pickTimer.stop();
  guessTimer.stop();
  hintTimer.stop();
  preloadTimer.stop();
  audioLoadedTimer.stop();
}

export function pickSong(song: SongItem) {
  pickTimer.stop();
  sendGameAction('picked_song', {
    want: userGuess(),
    pic: song.artworkUrl100,
    audio: song.previewUrl,
    track: song.trackName,
    artist: song.artistName,
  });
  setGameState('waiting_for_other_players');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const actions: Record<string, (params: any) => void> = {
  settings(settings: Settings) {
    resetGameState();

    setCurrentTopic(settings.topic);
    setTimeToPick(settings.timeToPick);
    setTimeToGuess(settings.timeToGuess);
    setGameState('pick_song');
    pickTimer.start(settings.timeToPick * 1000, () => {
      if (gameState() === 'waiting_for_other_players') return;
      sendGameAction('pick_time_out');
    })
  },
  rounds(songs: UserSong[]) {
    const newSongs = songs.map((e, i) => {
      e.audioEl = new Audio(e.audio);
      e.audioEl.preload = 'auto';
      if (i === 0) {
        e.audioEl.oncanplaythrough = () => audioLoadedTimer.start(5000, () => sendGameAction('ready'));
        e.audioEl.load();
      }
      return e;
    });
    setRounds(newSongs);
    setCurRound(0);
    setGameState('round_preload');
  },
  play() {
    setGameState('round_play');
    guessTimer.start(timeToGuess() * 1000, () => sendGameAction('giveup'));
    hintTimer.start(timeToGuess() * 500, () => setShowHint(true));

    rounds()[curRound()].audioEl?.play();
  },
  round_end(stats: RoundStats) {
    guessTimer.stop();
    hintTimer.stop();
    setShowHint(false);

    setGameState('show_answer');

    preloadTimer.start(showAnswerTime * 1000, () => {
      if (!gameState()) return;

      setRoundStats(stats.users);
      setGameState('round_preload');
      if (curRound() + 1 < rounds().length) {
        setCurRound(curRound() + 1);
        const el = rounds()[curRound()].audioEl;
        if (el) {
          el.oncanplaythrough = () => audioLoadedTimer.start(5000, () => sendGameAction('ready'));
          el.load();
        }
      }
    });
  },
  game_over() {
    // setTimeout(() => {
    //   sendGameAction('giveup');
    // }, timeToGuess() * 1000);
    resetGameState();
  },
};

export {
  currentTopic,
  setCurrentTopic,
  timeToPick,
  setTimeToPick,
  timeToGuess,
  setTimeToGuess,
  searchTerm,
  setSearchTerm,
  querySearchTerm,
  setQuerySearchTerm,
  selectedSong,
  setSelectedSong,
  userGuess,
  setUserGuess,
  gameState,
  setGameState,
  roundStats,
  setRoundStats,
  curRound,
  setCurRound,
  rounds,
  setRounds,
  actions,
  showAnswerTime,
};
