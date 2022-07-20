import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { observer } from "mobx-react-lite";
import { ComponentsPage } from "./pages/ComponentsPage";
import { LobbyPage } from "./pages/LobbyPage";
import { LangSelector } from "./components/LangSelector";

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
