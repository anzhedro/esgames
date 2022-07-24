import { Component, createEffect } from "solid-js";
import { Routes, Route, Router, Navigate } from "solid-app-router";
import { LoginPage } from "./pages/LoginPage";
import { LobbyPage } from "./pages/LobbyPage";

import "./styles/styles.scss";
import { ComponentsPage } from "./pages/ComponentsPage.jsx";
const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="room" element={<Navigate href="/" />} />
        <Route path="room/:id" element={<LobbyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
