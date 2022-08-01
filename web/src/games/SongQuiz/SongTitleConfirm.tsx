import { sendGameAction } from '../../store/room';
import { setUserGuess, setGameState, pickTimeout, userGuess, setPickTimeout } from './store';
import { SongItem } from './types';

export const SongTitleConfirm = (props: { song: SongItem }) => (
  <div class="quiz-game__chosen__song">
    <div class="quiz-game__pick__stage">
      <div class="input__container quiz-game__pick__song__edit-name">
        <input
          class="input__field"
          type="text"
          placeholder="Song name"
          value={props.song.trackName}
          onChange={(e) => setUserGuess(e.currentTarget.value)}
        />
      </div>
      <div class="buttons">
        <button class="button --link " onClick={() => setGameState('pick_song')}>
          Back
        </button>
        <button
          class="button --primary "
          onClick={() => {
            clearTimeout(pickTimeout());
            setPickTimeout(undefined);
            sendGameAction('picked_song', {
              want: userGuess(),
              pic: props.song.artworkUrl100,
              audio: props.song.previewUrl,
              track: props.song.trackName,
              artist: props.song.artistName,
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
