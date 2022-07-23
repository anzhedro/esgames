import { Chat } from "../components/Chat";
import { GamesTable } from "../components/GamesTable";
import { Players } from "../components/Players";
import { PlayersList } from "../components/PlayersList";
import { PlayersTeams } from "../components/PlayersTeams";
import { loginStatus, tryLogin } from "../store/auth";
import { useNavigate, useParams } from "solid-app-router";
import { createEffect, onMount } from "solid-js";
import { socket, socketReady } from "../store/store";

export const LobbyPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  createEffect(() => {

    if (loginStatus() === "none" && socketReady() === 1) {
        tryLogin(params.id);
    }

    if (loginStatus() === "fail") {
      navigate("/");
    }
  });

  return (
    <div className="lobby_page">
      <Show when={loginStatus() === "success"} fallback={<div>Loading...</div>}>
        <div className="wrapper">
          <Players>{true ? <PlayersList /> : <PlayersTeams />}</Players>
          <GamesTable />
          <Chat />
        </div>
      </Show>
    </div>
  );
};
