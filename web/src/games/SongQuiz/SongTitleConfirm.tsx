import { setUserGuess, setGameState, pickSong} from './store';
import { SongItem } from './types';

export const SongTitleConfirm = (props: { song: SongItem }) => (
  <div class="chosen__song">
    <div class="pick__stage">
      <div class="edit-name">
        <input
          type="text"
          placeholder="Song name"
          value={props.song.trackName}
          onChange={(e) => setUserGuess(e.currentTarget.value)}
        />
      </div>
      <div class="buttons">
        <button onClick={() => setGameState('pick_song')}>Back</button>
        <button
          onClick={() => pickSong(props.song)}
        >
          Choose this song!
        </button>
      </div>
    </div>
  </div>
);
