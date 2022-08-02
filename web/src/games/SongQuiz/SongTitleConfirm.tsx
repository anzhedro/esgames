import { sendGameAction } from '../../store/room';
import { setUserGuess, setGameState, pickTimeout, userGuess, setPickTimeout } from './store';
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
