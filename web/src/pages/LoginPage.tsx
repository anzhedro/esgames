import { useNavigate } from 'solid-app-router';
import { createEffect, Show } from 'solid-js';
import { LoginCard } from '../components/LoginCard';
import { currentLanguage, localizationMap } from '../store/localization';
import { appState, room } from '../store/state';
import { Spinner } from '../components/Spinner';
import { Timer } from '../components/Timer';

export const LoginPage = () => {
  const navigate = useNavigate();

  createEffect(() => {
    if (appState() === 'connected') {
      navigate(`/room/${room()}`);
    }
  });

  return (
    <div class="login__page">
      <Show when={appState() === 'start'} fallback={<Spinner />}>
        <LoginCard lang={localizationMap[currentLanguage()]} />
      </Show>
    </div>
  );
};
