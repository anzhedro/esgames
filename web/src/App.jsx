import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { observer } from "mobx-react-lite";
import { ComponentsPage } from "./pages/ComponentsPage";
import { LobbyPage } from "./pages/LobbyPage";
import { LangSelector } from "./components/LangSelector";
import { useEffect } from "react";
import { store } from "./store/store";

function App() {
  return (
    <>
      {/* <LangSelector /> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="lobby" element={<Navigate to="/" />} />
        <Route path="lobby/:id" element={<LobbyPage />} />
      </Routes>
    </>
  );
}

export default observer(App);
