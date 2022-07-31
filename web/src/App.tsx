import { Component } from 'solid-js';
import { Routes, Route, Navigate } from 'solid-app-router';
import { LoginPage } from './pages/LoginPage';
import { LobbyPage } from './pages/LobbyPage';

import './styles/styles.scss';
import { ComponentsPage } from './pages/ComponentsPage';
import { SongGame } from './pages/SongsPage';

const App: Component = () => (
  <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="components" element={<ComponentsPage />} />
      <Route path="room" element={<Navigate href="/" />} />
      <Route path="room/:id" element={<LobbyPage />} />
      <Route path="s" element={<SongGame />} />
    </Routes>
  </>
);

export default App;
