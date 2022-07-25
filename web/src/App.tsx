import { Component } from "solid-js";
import { Routes, Route, Navigate } from "solid-app-router";
import { LoginPage } from "./pages/LoginPage";
import { LobbyPage } from "./pages/LobbyPage";
import { HatDemo } from "./pages/HatDemo";

import "./styles/styles.scss";
import { ComponentsPage } from "./pages/ComponentsPage.jsx";

const App: Component = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="room" element={<Navigate href="/" />} />
        <Route path="room/:id" element={<LobbyPage />} />
        <Route path="demo/hat" element={<HatDemo />} />
      </Routes>
    </>
  );
};

export default App;
