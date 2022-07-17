import React from "react";
import { ChatMessage } from "../components/ChatMessage";
import { GamesTable } from "../components/GamesTable";
import { Players } from "../components/Players";

export const LobbyPage = () => {
  return (
    <div className="lobby_page">
      <div className="wrapper">
        <Players />
        <GamesTable />
        <ChatMessage />
      </div>
    </div>
  );
};
