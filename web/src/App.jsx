import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ChatPage } from "./pages/ChatPage";
import { observer } from "mobx-react-lite";
import { ComponentsPage } from "./pages/ComponentsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="chat/:id" element={<ChatPage />} />
      <Route path="components" element={<ComponentsPage />} />
    </Routes>
  );
}

export default observer(App);
