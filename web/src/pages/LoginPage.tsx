import { LoginCard } from "../components/LoginCard";
import { currentLanguage, localizationMap } from "../store/localization";
import { useNavigate } from "solid-app-router";
import { appState, room } from "../store/state";
import { createEffect, Show } from "solid-js";

export const LoginPage = () => {
  const navigate = useNavigate();

  createEffect(() => {
    if (appState() == "connected") {
      navigate(`/room/${room()}`);
    }
  });

  return (
    <div class="login__page">
      <Show
        when={appState() === "start"}
        fallback={
          <div class="spinner-container">
            <div class="loading-spinner"></div>
          </div>
        }
      >
        <LoginCard lang={localizationMap[currentLanguage()]} />
      </Show>
    </div>
  );
};
