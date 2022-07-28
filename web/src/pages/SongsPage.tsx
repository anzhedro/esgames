import {
	createResource,
	createSignal,
	For,
	Match,
	Show,
	Switch,
} from "solid-js";

const fetchMusic = async (searchTerm: string) => {
	if (!searchTerm) {
		return;
	}
	return (
		await fetch(
			`https://itunes.apple.com/search?term=${searchTerm}&limit=20&country=gb&media=music&entity=musicTrack&explicit=yes`
		)
	).json();
};

const [searchTerm, setSearchTerm] = createSignal("");
const [querySearchTerm, setQuerySearchTerm] = createSignal("");
const [selectedSong, setSelectedSong] = createSignal("");
const [gameState, setGameState] = createSignal("pick_search");
const [songs] = createResource(querySearchTerm, fetchMusic);

const SongSearch = () => {
	return (
		<div class="quiz-game">
			<div class="quiz-game__pick__search">
				<input
					class="input__field"
					type="text"
					placeholder="Song / artist"
					onChange={(e) => setSearchTerm(e.currentTarget.value)}
				/>

				<button
					class="button --secondary "
					onClick={() => setQuerySearchTerm(searchTerm)}
				>
					<span class="button__label --secondary">Search</span>
				</button>
			</div>

			<Show when={songs()} fallback={<div></div>}>
				<div class="quiz-game__pick__results">
					<For each={songs().results}>
						{(song) => (
							<div
								class="quiz-game__pick__results__row"
								onClick={() => {
									setSelectedSong(song);
									setGameState("pick_song_player");
								}}
							>
								<span class="quiz-game__pick__results__row__main">
									{song.trackName}
								</span>
								- {song.artistName}
							</div>
						)}
					</For>
				</div>
			</Show>
		</div>
	);
};

const SelectedSongPreview = () => {
	return (
		<>
			<div
				class="quiz-game__pick__song__image"
				style={{
					"background-image": `url(${selectedSong().artworkUrl100})`,
					height: "100px",
					width: "100px",
				}}
			></div>
			<div class="quiz-game__pick__song__player__content">
				<div class="quiz-game__pick__song__player__content__top">
					<div class="quiz-game__pick__song__name">
						{selectedSong().trackName}
					</div>
					<div class="quiz-game__pick__song__details">
						{selectedSong().artistName}
					</div>
					<audio
						class="quiz-game__pick__song__audio"
						controls=""
						style={{ height: "40px", width: "300px" }}
					>
						<source src={selectedSong().previewUrl} type="audio/mpeg" />
						Your browser does not support the audio element.
					</audio>
				</div>
				<div class="quiz-game__pick__song__player__content__bottom">
					<button
						class="button --link "
						onClick={() => setGameState("pick_search")}
					>
						<span class="button__label --link">Cancel</span>
					</button>
					<button class="button --primary ">
						<span class="button__label --primary">Pick Song</span>
					</button>
				</div>
			</div>
		</>
	);
};

export const SongGame = () => {
	return (
		<div class="quiz-container">
			<div class="title">Pick a song for others to guess:</div>
			<Switch>
				<Match when={gameState() === "pick_search"}>
					<SongSearch />
				</Match>
				<Match when={gameState() === "pick_song_player"}>
					<SelectedSongPreview />
				</Match>
			</Switch>
		</div>
	);
};
