import { useNavigate, useParams } from 'solid-app-router';
import { createEffect, Show } from 'solid-js';
import { Chat } from '../components/Chat';
import { GamesTable } from '../components/GamesTable';
import { Players } from '../components/Players';
import { PlayersList } from '../components/PlayersList';
import { appState, setRoom } from '../store/state';
import { currentLanguage, localizationMap } from '../store/localization';
import { Spinner } from '../components/Spinner';

export const LobbyPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  createEffect(() => {
    if (appState() === 'start') {
      setRoom(params.id);
      navigate('/');
    }
  });

  return (
    <div class="lobby_page">
      <Show when={appState() === 'connected'} fallback={<Spinner />}>
        <div class="wrapper">
          <Players>
            <PlayersList />
          </Players>
          <GamesTable />
          <Chat lang={localizationMap[currentLanguage()]} />
        </div>
      </Show>
    </div>
  );
};
