import { LoginCard } from "../components/LoginCard";
import { currentLanguage, localizationMap } from "../store/localization";
import { useNavigate } from "solid-app-router";
import { appState, room } from "../store/state";
import { createEffect, Show } from "solid-js";
import { Spinner } from "../components/Spinner";

// https://itunes.apple.com/search?term=abba&limit=20&country=gb&media=music&entity=musicTrack&explicit=yes

// let response = {
//   resultCount: 20,
//   results: [
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422648513,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "Dancing Queen",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "Dancing Queen",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/dancing-queen/1422648512?i=1422648513&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/dancing-queen/1422648512?i=1422648513&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/91/27/9c/91279cdb-1720-549e-b53e-1990191ba4af/mzaf_6738484681220850445.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1976-01-01T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 1,
//       trackTimeMillis: 231844,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422649007,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "Thank You for the Music",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "Thank You for the Music",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/thank-you-for-the-music/1422648512?i=1422649007&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/thank-you-for-the-music/1422648512?i=1422649007&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/c3/ce/f3/c3cef3e9-3ce5-19bd-b921-bcb3ac617ec8/mzaf_7494607962024645943.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1977-12-12T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 18,
//       trackTimeMillis: 228102,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422648959,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "Money, Money, Money",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "Money, Money, Money",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/money-money-money/1422648512?i=1422648959&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/money-money-money/1422648512?i=1422648959&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/61/b3/89/61b3897d-fae1-33da-0066-4d2d2343fe82/mzaf_10051769475369663552.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1976-11-01T08:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 9,
//       trackTimeMillis: 185979,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422648822,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "Lay All Your Love On Me",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "Lay All Your Love On Me",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/lay-all-your-love-on-me/1422648512?i=1422648822&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/lay-all-your-love-on-me/1422648512?i=1422648822&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/e0/e6/a6/e0e6a64a-f64c-25f7-8dac-198a121d9466/mzaf_1798884956965243687.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1981-07-01T07:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 5,
//       trackTimeMillis: 274525,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422648966,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "SOS",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "SOS",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/sos/1422648512?i=1422648966&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/sos/1422648512?i=1422648966&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/91/40/e3/9140e3a3-8250-20c5-9926-6cd6bd2f9179/mzaf_16517752846637615384.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1975-04-21T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 10,
//       trackTimeMillis: 201678,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422648844,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "The Winner Takes It All",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "The Winner Takes It All",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/the-winner-takes-it-all/1422648512?i=1422648844&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/the-winner-takes-it-all/1422648512?i=1422648844&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/bc/bf/b6/bcbfb60c-35ed-f043-4caf-880bfc42217a/mzaf_254088361601094850.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1980-07-21T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 8,
//       trackTimeMillis: 294806,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422648833,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "I Have a Dream",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "I Have a Dream",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/i-have-a-dream/1422648512?i=1422648833&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/i-have-a-dream/1422648512?i=1422648833&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/f0/7b/02/f07b02f7-66cf-b378-2814-d6250f25b613/mzaf_15200387973689239563.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1979-04-23T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 7,
//       trackTimeMillis: 283848,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422648821,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "Mamma Mia",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "Mamma Mia",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/mamma-mia/1422648512?i=1422648821&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/mamma-mia/1422648512?i=1422648821&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b9/1d/b0/b91db04c-c0a5-2e4e-a985-afb5b9ccbd40/mzaf_5202613435823436575.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1975-04-21T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 4,
//       trackTimeMillis: 212304,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422649001,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "Does Your Mother Know",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "Does Your Mother Know",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/does-your-mother-know/1422648512?i=1422649001&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/does-your-mother-know/1422648512?i=1422649001&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/00/2d/cb/002dcbe6-c01a-e19e-e42f-03fe8a0a294b/mzaf_3377394931530833877.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1979-04-23T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 15,
//       trackTimeMillis: 194561,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422648967,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "Chiquitita",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "Chiquitita",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/chiquitita/1422648512?i=1422648967&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/chiquitita/1422648512?i=1422648967&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/9b/b3/ca/9bb3cacf-3f19-ed7e-29c4-b79ff7472664/mzaf_2815020709243122699.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1979-01-16T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 11,
//       trackTimeMillis: 325796,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422648969,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "Voulez-Vous",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "Voulez-Vous",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/voulez-vous/1422648512?i=1422648969&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/voulez-vous/1422648512?i=1422648969&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/1b/8b/72/1b8b725d-ce69-8653-8d02-c2c569bd51ef/mzaf_7384466278179603661.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1979-04-23T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 13,
//       trackTimeMillis: 308278,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422649021,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "Waterloo",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "Waterloo",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/waterloo/1422648512?i=1422649021&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/waterloo/1422648512?i=1422649021&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/82/2e/9a/822e9ada-a2c0-efa2-35b9-4d703597a854/mzaf_1888873553318015354.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1974-03-04T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 19,
//       trackTimeMillis: 164432,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422648970,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "Gimme! Gimme! Gimme! (A Man After Midnight)",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "Gimme! Gimme! Gimme! (A Man After Midnight)",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl:
//         "https://music.apple.com/gb/album/gimme-gimme-gimme-a-man-after-midnight/1422648512?i=1422648970&uo=4",
//       trackViewUrl:
//         "https://music.apple.com/gb/album/gimme-gimme-gimme-a-man-after-midnight/1422648512?i=1422648970&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/be/2f/62/be2f6204-2686-596b-b709-eec10e6e8090/mzaf_10555537920764789806.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1979-04-23T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 14,
//       trackTimeMillis: 289887,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422649004,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "The Name of the Game",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "The Name of the Game",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/the-name-of-the-game/1422648512?i=1422649004&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/the-name-of-the-game/1422648512?i=1422649004&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/59/ef/85/59ef858d-1356-8f15-4581-4980e228f4a7/mzaf_10901029858413093684.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1977-10-14T07:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 17,
//       trackTimeMillis: 291934,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422649003,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "One of Us",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "One of Us",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/one-of-us/1422648512?i=1422649003&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/one-of-us/1422648512?i=1422649003&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/7d/e2/dd/7de2dd39-802d-3477-190f-13aa1b6ad0d1/mzaf_7917335691799880126.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1981-11-30T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 16,
//       trackTimeMillis: 235820,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422648520,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "Take a Chance On Me",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "Take a Chance On Me",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/take-a-chance-on-me/1422648512?i=1422648520&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/take-a-chance-on-me/1422648512?i=1422648520&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/10/4d/2f/104d2fe3-9eaf-7883-b0b3-ce9bcc52fec9/mzaf_14609173468658357664.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1977-12-12T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 3,
//       trackTimeMillis: 244954,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422648515,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "Knowing Me, Knowing You",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "Knowing Me, Knowing You",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/knowing-me-knowing-you/1422648512?i=1422648515&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/knowing-me-knowing-you/1422648512?i=1422648515&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5e/98/d3/5e98d3a6-b5f7-80f4-60c4-9c4511c4ccfa/mzaf_8453085686102613125.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1977-02-14T08:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 2,
//       trackTimeMillis: 241643,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422648824,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "Super Trouper",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "Super Trouper",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/super-trouper/1422648512?i=1422648824&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/super-trouper/1422648512?i=1422648824&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/66/7a/12/667a1223-9c39-ebbb-2f5f-c311c4e72968/mzaf_5583738593501507145.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1980-11-03T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 6,
//       trackTimeMillis: 251187,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1422648512,
//       trackId: 1422648968,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits",
//       trackName: "Fernando",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "Fernando",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/fernando/1422648512?i=1422648968&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/fernando/1422648512?i=1422648968&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/53/80/58/53805825-c620-ce19-5d39-7f3f6c6fe071/mzaf_17538402011024842669.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 4.99,
//       trackPrice: 0.99,
//       releaseDate: "1976-03-16T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 1,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 12,
//       trackTimeMillis: 253220,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//     {
//       wrapperType: "track",
//       kind: "song",
//       artistId: 372976,
//       collectionId: 1440816833,
//       trackId: 1440816992,
//       artistName: "ABBA",
//       collectionName: "ABBA Gold: Greatest Hits (40th Anniversary Edition)",
//       trackName: "Thank You for the Music",
//       collectionCensoredName: "ABBA Gold: Greatest Hits",
//       trackCensoredName: "Thank You for the Music",
//       artistViewUrl: "https://music.apple.com/gb/artist/abba/372976?uo=4",
//       collectionViewUrl: "https://music.apple.com/gb/album/thank-you-for-the-music/1440816833?i=1440816992&uo=4",
//       trackViewUrl: "https://music.apple.com/gb/album/thank-you-for-the-music/1440816833?i=1440816992&uo=4",
//       previewUrl:
//         "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/87/25/f1/8725f1ec-c0f8-e605-a995-0317329193e5/mzaf_12887717261665146832.plus.aac.p.m4a",
//       artworkUrl30:
//         "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3d/72/9c/3d729c40-b2c8-772a-fa04-871ea2f7efa0/14UMGIM11148.rgb.jpg/30x30bb.jpg",
//       artworkUrl60:
//         "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3d/72/9c/3d729c40-b2c8-772a-fa04-871ea2f7efa0/14UMGIM11148.rgb.jpg/60x60bb.jpg",
//       artworkUrl100:
//         "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3d/72/9c/3d729c40-b2c8-772a-fa04-871ea2f7efa0/14UMGIM11148.rgb.jpg/100x100bb.jpg",
//       collectionPrice: 13.99,
//       trackPrice: 0.99,
//       releaseDate: "1977-12-12T12:00:00Z",
//       collectionExplicitness: "notExplicit",
//       trackExplicitness: "notExplicit",
//       discCount: 3,
//       discNumber: 1,
//       trackCount: 19,
//       trackNumber: 18,
//       trackTimeMillis: 228613,
//       country: "GBR",
//       currency: "GBP",
//       primaryGenreName: "Pop",
//       isStreamable: true,
//     },
//   ],
// };

const handleClick = async () => {
  // setIsLoading(true);
  try {
    const response = await fetch(
      "https://itunes.apple.com/search?term=abba&limit=20&country=gb&media=music&entity=musicTrack&explicit=yes",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();

    console.log("result is: ", JSON.stringify(result, null, 4));

    //   setData(result);
  } catch (err) {
    // setErr(err.message);
  } finally {
    // setIsLoading(false);
  }
};

export const LoginPage = () => {
  const navigate = useNavigate();

  createEffect(() => {
    if (appState() == "connected") {
      navigate(`/room/${room()}`);
    }
  });

  return (
    <div class="login__page">
      <Show when={appState() === "start"} fallback={<Spinner />}>
        <div class="quiz-game__pick__stage">
          <div class="quiz-game__pick__title">Pick a song for others to guess:</div>
          <div class="quiz-game__pick__search">
            <div class="input__container">
              <input class="input__field" type="text" placeholder="Song / artist" />
            </div>
            <button class="button --secondary " onClick={handleClick}>
              <span class="button__label --secondary">Search</span>
            </button>
          </div>
          <div class="quiz-game__pick__results">
            <div class="quiz-game__pick__results__row">
              <span class="quiz-game__pick__results__row__main">111</span> - Paul Weller
            </div>
            <div class="quiz-game__pick__results__row">
              <span class="quiz-game__pick__results__row__main">Wahe - The </span> - 111 &amp; Monk
            </div>
          </div>
        </div>

        {/* <div class="quiz-game__pick__song__player">
          <div
            class="quiz-game__pick__song__image"
            style='background-image: url("https://is2-ssl.mzstatic.com/image/thumb/Music118/v4/f1/5c/2a/f15c2a4c-14a6-aa97-aec5-88417758bb0e/00602517757097.rgb.jpg/100x100bb.jpg");'
          ></div>
          <div class="quiz-game__pick__song__player__content">
            <div class="quiz-game__pick__song__player__content__top">
              <div class="quiz-game__pick__song__name">111</div>
              <div class="quiz-game__pick__song__details">Paul Weller</div>
              <audio class="quiz-game__pick__song__audio" controls="" style={{ height: "40px", width: "300px" }}>
                <source
                  src="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/43/67/be/4367be3e-6924-6909-53a1-0fea2a5d6631/mzaf_14447739538436942121.plus.aac.p.m4a"
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div class="quiz-game__pick__song__player__content__bottom">
              <button class="button --link ">
                <span class="button__label --link">Cancel</span>
              </button>
              <button class="button --primary ">
                <span class="button__label --primary">Pick Song</span>
              </button>
            </div>
          </div>
        </div> */}

        {/* <audio class="quiz-game__pick__song__audio" controls="" style={{ height: "40px", width: "300px" }}>
          <source
            src="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/93/c2/f9/93c2f9cd-0c13-e49a-6eda-700aaa5a0d8a/mzaf_7799222933384777055.plus.aac.p.m4a"
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio> */}
        {/* <LoginCard lang={localizationMap[currentLanguage()]} /> */}
      </Show>
    </div>
  );
};
