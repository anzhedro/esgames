import { nanoid } from "nanoid";
import React from "react";
import { Button } from "../components/Button";
import { Chat } from "../components/Chat";
import { ChatMessage } from "../components/ChatMessage";
import { GamesTable } from "../components/GamesTable";
import { Input } from "../components/input";
import { Players } from "../components/Players";
import { Title } from "../components/Title";
import { store } from "../store/store";

export const LobbyPage = () => {
  return (
    <div className="lobby_page">
      <div className="wrapper">
        <Players />
        <GamesTable />
        <Chat />
      </div>
    </div>
  );
};
