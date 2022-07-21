import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chat } from "../components/Chat";
import { GamesTable } from "../components/GamesTable";
import { Players } from "../components/Players";
import { PlayersList } from "../components/PlayersList";
import { PlayersTeams } from "../components/PlayersTeams";
import { store } from "../store/store";

export const LobbyPage = observer(() => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (store.auth.ws.readyState === 1 && store.auth.login_status === "none") {
      store.auth.tryLogin(params.id);
    }
  }, []);

  useEffect(() => {
    if (store.auth.ws.readyState === 1 && store.auth.login_status === "none") {
      store.auth.tryLogin(params.id);
    }
  }, [store.auth.ws.readyState]);

  useEffect(() => {
    if (store.auth.login_status === "fail") {
      navigate("/");
    }
  }, [store.auth.login_status]);

  return (
    <div className="lobby_page">
      {store.auth.login_status === "success" ? (
        <div className="wrapper">
          <Players>{true ? <PlayersList /> : <PlayersTeams />}</Players>
          <GamesTable />
          <Chat />
        </div>
      ) : (
        <div>"loading..."</div>
      )}
    </div>
  );
});
