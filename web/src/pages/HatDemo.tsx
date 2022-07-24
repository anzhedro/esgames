import { Chat } from "../components/Chat";
import { GamesTable } from "../components/GamesTable";
import { Players } from "../components/Players";
import { PlayersList } from "../components/PlayersList";
import { PlayersTeams } from "../components/PlayersTeams";
import { currentLanguage, localizationMap } from "../store/localization";

export const HatDemo = () => {
  return (
    <div class="lobby_page">
      <div class="wrapper">
        <Players>{true ? <PlayersList /> : <PlayersTeams />}</Players>
        <GamesTable />
        <Chat lang={localizationMap[currentLanguage()]} />
      </div>
    </div>
  );
};
