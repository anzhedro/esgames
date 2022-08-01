import { Component } from 'solid-js';
import { Routes, Route, Navigate } from 'solid-app-router';
import { LoginPage } from './pages/LoginPage';
import { LobbyPage } from './pages/LobbyPage';

import './styles/styles.scss';

const App: Component = () => (
  <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="room" element={<Navigate href="/" />} />
      <Route path="room/:id" element={<LobbyPage />} />
    </Routes>
  </>
);

export default App;
