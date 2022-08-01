import { createResource, Suspense, Show, For } from 'solid-js';
import { Spinner } from '../../components/Spinner';
import { querySearchTerm, setSearchTerm, setQuerySearchTerm, searchTerm, setSelectedSong, selectedSong } from './store';
import { fetchMusicResponse, SongItem } from './types';

export const SongSearch = () => {
  const fetchMusic = async (searchTermParam: string): Promise<fetchMusicResponse> =>
    (
      await fetch(
        `https://itunes.apple.com/search?${new URLSearchParams({
          term: searchTermParam,
          limit: '20',
          country: 'gb',
          media: 'music',
          entity: 'musicTrack',
          explicit: 'yes',
        })}`
      )
    ).json();
  const [songs] = createResource(querySearchTerm, fetchMusic);

  return (
    <div class="quiz-game">
      <form class="quiz-game__pick__search" onSubmit={(e) => e.preventDefault()}>
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
            <For each={songs()?.results}>
              {(song: SongItem) => (
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
                  <span class="quiz-game__pick__results__row__main">{song.trackName}</span> - {song.artistName}
                </div>
              )}
            </For>
          </div>
        </Show>
      </Suspense>
    </div>
  );
};
