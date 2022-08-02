import { createResource, Suspense, Show, For, createEffect } from 'solid-js';
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

  createEffect(() => {
    console.log(songs());
  });

  return (
    <div class="song_search">
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input type="text" placeholder="Song / artist" onChange={(e) => setSearchTerm(e.currentTarget.value)} />
        </div>

        <button
          onClick={() => {
            setQuerySearchTerm(searchTerm);
            setSelectedSong(null);
          }}
        >
          <span>Search</span>
        </button>
      </form>
      <Suspense fallback={<Spinner />}>
        <Show when={songs() && songs()?.results.length}>
          <div class="pick__results">
            <For each={songs()?.results}>
              {(song: SongItem) => (
                <div
                  classList={{
                    selected: selectedSong() === song,
                    // ?
                    row: true,
                  }}
                  onClick={() => {
                    if (selectedSong() === song) return;
                    setSelectedSong(null);
                    setSelectedSong(song);
                    // setGameState("pick_song_player");
                  }}
                >
                  <span class="row__main">{song.trackName}</span> - {song.artistName}
                </div>
              )}
            </For>
          </div>
        </Show>
      </Suspense>
    </div>
  );
};
