import { Chat } from "../components/Chat";
import { GamesTable } from "../components/GamesTable";
import { Players } from "../components/Players";
import { PlayersList } from "../components/PlayersList";
import { PlayersTeams } from "../components/PlayersTeams";
import { appState, setRoom } from "../store/state";
import { useNavigate, useParams } from "solid-app-router";
import { createEffect, Show } from "solid-js";
import { currentLanguage, localizationMap } from "../store/localization";

export const LobbyPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  createEffect(() => {
    if (appState() === "start") {
      setRoom(params.id);
      navigate("/");
    }
  });

  return (
    <div class="lobby_page">
      <Show when={appState() === "connected"} fallback={<div>Loading...</div>}>
        <div class="wrapper">
          <Players>{true ? <PlayersList /> : <PlayersTeams />}</Players>
          <GamesTable />
          <Chat lang={localizationMap[currentLanguage()]} />
        </div>
      </Show>
    </div>
  );
};
