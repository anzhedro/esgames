import React from "react";
import { Chat } from "../components/Chat";
import { GamesTable } from "../components/GamesTable";
import { Players } from "../components/Players";

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
