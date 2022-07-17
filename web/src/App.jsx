import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ChatPage } from "./pages/ChatPage";
import { observer } from "mobx-react-lite";
import { ComponentsPage } from "./pages/ComponentsPage";
import { LobbyPage } from "./pages/LobbyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="chat/:id" element={<ChatPage />} />
      <Route path="components" element={<ComponentsPage />} />
      <Route path="lobby" element={<Navigate to="/"  />} />
      <Route path="lobby/:id" element={<LobbyPage />} />
    </Routes>
  );
}

export default observer(App);