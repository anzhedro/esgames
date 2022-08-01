import { setGameState, setUserGuess } from './store';
import { SongItem } from './types';

export const SongPreview = (props: { song: SongItem }) => (
  <>
    <div class="quiz-game__player">
      <div
        class="quiz-game__pick__song__image"
        style={{ 'background-image': `url(${props.song.artworkUrl100})` }}
      ></div>
      <div class="quiz-game__pick__song__player__content">
        <div class="quiz-game__pick__song__player__content__top">
          <div class="quiz-game__pick__song__name">{props.song.trackName}</div>
          <div class="quiz-game__pick__song__details">{props.song.artistName}</div>
          <audio class="quiz-game__pick__song__audio" controls={true}>
            <source src={props.song.previewUrl} type="audio/mpeg" />
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
          setUserGuess(props.song.trackName);
        }}
      >
        <span class="button__label --primary">Pick Song</span>
      </button>
    </div>
  </>
);
