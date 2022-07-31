import {
  createResource,
  createSignal,
  For,
  Match,
  Show,
  Suspense,
  Switch,
} from 'solid-js';
import { Spinner } from '../components/Spinner';

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
const [gameState, setGameState] = createSignal('pick_search');

const [userGuess, setUserGuess] = createSignal('');

// const [songs] = createResource(querySearchTerm, fetchMusic);

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
            {/* <source src={selectedSong()!.previewUrl} type="audio/mpeg" /> */}
            <source src={selectedSong()!.previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
    <div class="quiz-game__pick__song__player__content__bottom">
      {/* <button class="button --link " onClick={() => setGameState("pick_search")}>
            <span class="button__label --link">Cancel</span>
          </button> */}
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
          onClick={() => setGameState('pick_search')}
        >
          Back
        </button>
        <button
          class="button --primary "
          onClick={() => {
            console.log(userGuess());
            // send ws message

            setGameState('round')
            // () => {
            //   sendGameAction("picked_song", {
            //     want: userGuess(),
            //     pic: selectedSong()!.artworkUrl100,
            //     audio: selectedSong()!.previewUrl,
            //     track: selectedSong()!.trackName,
            //     artist: selectedSong()!.artistName,
            //   });
            // }

          }}
        >
          Choose this song!
        </button>
      </div>
    </div>
  </div>
);

export const SongGame = () => (
  <div class="quiz-container">
    <Switch>
      <Match when={gameState() === 'pick_search'}>
        <h2 class="title">Pick a song for others to guess:</h2>
        <SongSearch />
        <Show when={selectedSong()}>
          <SongPreview />
        </Show>
      </Match>
      <Match when={gameState() === 'confirm_song_title'}>
        <div class="title">Confirm the name other players will guess:</div>
        <SongTitleConfirm />
      </Match>
      <Match when={gameState() === 'round'}>
        <div class="title">Confirm the name other players will guess:</div>
        <SongTitleConfirm />
      </Match>



    </Switch>
  </div>
);
