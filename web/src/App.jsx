import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ChatPage } from "./pages/ChatPage";
import { observer } from "mobx-react-lite";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="chat/:id" element={<ChatPage />} />
    </Routes>
  );
}

export default observer(App);
