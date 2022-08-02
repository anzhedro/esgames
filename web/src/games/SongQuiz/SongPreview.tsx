import { setGameState, setUserGuess } from './store';
import { SongItem } from './types';

export const SongPreview = (props: { song: SongItem }) => (
  <>
    <div class="player">
      <img class="image" src={props.song.artworkUrl100} />
      <div class="content">
        <div class="top">
          <div class="name">{props.song.trackName}</div>
          <div class="details">{props.song.artistName}</div>
          <audio class="audio" controls={true}>
            <source src={props.song.previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
    <button
      class="confirm"
      onClick={() => {
        setGameState('confirm_song_title');
        setUserGuess(props.song.trackName);
      }}
    >
      <span>Pick Song</span>
    </button>
  </>
);
