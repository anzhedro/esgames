import { Component, createEffect } from "solid-js";
import { Routes, Route, Router } from "solid-app-router";
import { LoginPage } from "./pages/LoginPage.jsx";
import './styles/styles.scss'
const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="components" element={<ComponentsPage />} /> */}
        {/* <Route path="lobby" element={<Navigate to="/" />} /> */}
        {/* <Route path="lobby/:id" element={<LobbyPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
