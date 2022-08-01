import { createSignal } from 'solid-js';
import { sendGameAction } from '../../store/room';
import { RoundStats, Settings, SongItem, UserSong, UserStat } from './types';

const [pickTimeout, setPickTimeout] = createSignal<NodeJS.Timeout | undefined>();
const [guessTimeout, setGuessTimeout] = createSignal<NodeJS.Timeout | undefined>();
const [secondsTicker, setSecondsTicker] = createSignal<NodeJS.Timeout | undefined>();
// let pickTimeout: number | undefined;
// let guessTimeout: number | undefined;
// let secondsTicker: number | undefined;

const [currentTopic, setCurrentTopic] = createSignal('No theme');
const [timeToPick, setTimeToPick] = createSignal(60);
const [timeToGuess, setTimeToGuess] = createSignal(20);
const [searchTerm, setSearchTerm] = createSignal('');
const [querySearchTerm, setQuerySearchTerm] = createSignal<string>();
const [selectedSong, setSelectedSong] = createSignal<SongItem | null>(null);
const [userGuess, setUserGuess] = createSignal('');
const [gameState, setGameState] = createSignal('');

const [timeLeft, setTimeLeft] = createSignal(60);
const [curRound, setCurRound] = createSignal(0);
const [rounds, setRounds] = createSignal<UserSong[]>([]);
const [roundStats, setRoundStats] = createSignal<UserStat[]>([]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const actions: Record<string, (params: any) => void> = {
  settings(settings: Settings) {
    // Reset game state
    setRoundStats([]);
    setRounds([]);
    setCurRound(0);
    setUserGuess('');
    setSelectedSong(null);
    setSearchTerm('');
    setQuerySearchTerm('');

    setCurrentTopic(settings.topic);
    setTimeToPick(settings.timeToPick);
    setTimeToGuess(settings.timeToGuess);

    setTimeLeft(settings.timeToPick);

    setGameState('pick_song');
    setPickTimeout(
      setTimeout(() => {
        if (gameState() === 'waiting_for_other_players') return;
        sendGameAction('pick_time_out');
      }, settings.timeToPick * 1000)
    );
    setSecondsTicker(
      setInterval(() => {
        setTimeLeft(timeLeft() - 1);
      }, 1000)
    );
  },
  rounds(songs: UserSong[]) {
    setCurRound(0);
    const newSongs = songs.map((e, i) => {
      e.audioEl = new Audio(e.audio);
      e.audioEl.preload = 'auto';
      if (i === 0) {
        e.audioEl.oncanplaythrough = () => setTimeout(() => sendGameAction('ready'), 5000);
        e.audioEl.load();
      }
      return e;
    });
    setRounds(newSongs);
    setGameState('round_preload');
  },
  play() {
    setGameState('round_play');
    rounds()[curRound()].audioEl?.play();
    setGuessTimeout(
      setTimeout(() => {
        sendGameAction('giveup');
      }, timeToGuess() * 1000)
    );
  },
  round_end(stats: RoundStats) {
    if (guessTimeout) {
      clearTimeout(guessTimeout());
      setGuessTimeout(undefined);
    }
    setRoundStats(stats.users);
    setGameState('round_preload');
    if (curRound() + 1 < rounds().length) {
      setCurRound(curRound() + 1);
      const el = rounds()[curRound()].audioEl;
      if (!el) return;
      el.oncanplaythrough = () => setTimeout(() => sendGameAction('ready'), 5000);
      el.load();
    }
  },
  game_over() {},
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
  pickTimeout,
  guessTimeout,
  secondsTicker,
  setSecondsTicker,
  roundStats,
  setRoundStats,
  curRound,
  setCurRound,
  rounds,
  setRounds,
  actions,
  timeLeft,
  setTimeLeft,
  setPickTimeout,
};
