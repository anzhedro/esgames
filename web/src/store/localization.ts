import { createSignal } from 'solid-js';

export type Translation = {
  createRoom: string;
  joinRoom: string;
  loginText: string;
  yourName: string;
  roomName: string;
  create: string;
  join: string;
  playersHeader: string;
  player: string;
  spectators: string;
  gamesHeader: string;
  inviteFooter: string;
  backFooter: string;
  startFooter: string;
  chat: string;
  messagePlaceholder: string;
  nomessages: string;
  gameTitles: Record<string, string>;
  songquizTopics: string[];
};

const localizationMap: Record<string, Translation> = {
  en: {
    createRoom: 'CREATE ROOM',
    joinRoom: 'JOIN ROOM',
    loginText: 'Enter your name and a room to join',
    yourName: 'YOUR NAME',
    roomName: 'ROOM NAME',
    create: 'CREATE',
    join: 'JOIN',

    playersHeader: 'PLAYERS',
    player: 'PLAYER',
    spectators: 'SPECTATORS',

    gamesHeader: 'GAMES',

    inviteFooter: 'INVITE',
    backFooter: 'BACK',
    startFooter: 'START',

    chat: 'CHAT',
    messagePlaceholder: 'Your message...',
    nomessages: 'no messages',

    gameTitles: {
      reaction: 'Reaction',
      hat: 'Hat',
      boring_game: 'Boring game',
      codenames: 'Code names',
      crocodile: 'Crocodile',
      guess_melody: 'Guess the melody',
      songquiz: 'Songlio',
      lie: 'Lie',
      vladilen: 'Vladilen',
    },

    songquizTopics: [
      'No theme',
      'Custom',
      'Lockdown',
      'Disney',
      'TV Shows',
      'Film Soundtracks',
      'Cartoon Themes',
      'Songs with a name in them',
      'Songs containing a place/city/country',
      'Colours',
      'Videogames',
      '80s',
      '90s',
      '00s',
      'Christmas',
      'Musicals',
      'Covers',
      'Songs where the name is never mentioned in the lyrics',
      'Songs in a different language',
      'Game Show Theme Songs',
      'Rap',
      'Classical music',
      'One-word artist names',
    ],
  },

  ru: {
    createRoom: 'СОЗДАТЬ КОМНАТУ',
    joinRoom: 'ПРИСОЕДИНИТЬСЯ К КОМНАТЕ',
    loginText: 'Введите ваше имя и название комнаты для входа',
    yourName: 'ВАШЕ ИМЯ',
    roomName: 'ИМЯ КОМНАТЫ',
    create: 'СОЗДАТЬ',
    join: 'ВОЙТИ',

    playersHeader: 'ИГРОКОВ',
    player: 'ИГРОК',
    spectators: 'ЗРИТЕЛИ',

    gamesHeader: 'ИГРЫ',

    inviteFooter: 'ПРИГЛАСИТЬ',
    backFooter: 'НАЗАД',
    startFooter: 'НАЧАТЬ',

    chat: 'ЧАТ',
    messagePlaceholder: 'Ваше сообщение...',
    nomessages: 'нет сообщений',
    gameTitles: {
      reaction: 'Реакция',
      hat: 'Шляпа',
      boring_game: 'Скучная игра',
      codenames: 'Кодовые имена',
      crocodile: 'Крокодил',
      guess_melody: 'Угадай мелодию',
      songquiz: 'Песня',
      lie: 'Ложь',
      vladilen: 'Владилен',
    },
    songquizTopics: [
      'Без темы',
      'Пользовательская',
      'Карантин',
      'Дисней',
      'ТВ-шоу',
      'Фильмы',
      'Мультфильмы',
      'Песни с названием в них',
      'Песни с местом/городом/страной',
      'Цвета',
      'Видеоигры',
      '80ые',
      '90ые',
      '00ые',
      'Рождество',
      'Мьюзиклы',
      'Каверы',
      'Песни, где название никогда не встречается в тексте',
      'Песни на другом языке',
      'Заставки игровых шоу',
      'Рэп',
      'Классическая музыка',
      'Име исполнителя из одного слова',
    ],
  },
};

const [currentLanguage, setCurrentLanguage] = createSignal('en');
const languages = Object.keys(localizationMap);

const handleSetCurrentLanguage = (language: string) => {
  setCurrentLanguage(language);
};

export { currentLanguage, handleSetCurrentLanguage, languages, localizationMap };
