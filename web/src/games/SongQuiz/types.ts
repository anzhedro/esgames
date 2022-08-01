export interface SongItem {
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

export interface fetchMusicResponse {
  results: SongItem[];
  resultCount: number;
}

export interface UserSong {
  user: string;
  want: string;
  pic: string;
  audio: string;
  track: string;
  artist: string;
  audioEl?: HTMLAudioElement;
}

export interface Settings {
  topic: string;
  timeToPick: number;
  timeToGuess: number;
}

export interface RoundStats {
  users: UserStat[];
}

export interface UserStat {
  user: string;
  guessedIn?: number;
  roundScore: number;
  totalScore: number;
}
