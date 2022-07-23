import { createEffect } from "solid-js";
import { LoginCard } from "../components/LoginCard";
import { useNavigate, useRouteData } from 'solid-app-router';
import {currentLanguage, localizationMap} from '../store/localization'
import { loginStatus } from "../store/auth";

const currentPageLocalization = localizationMap[currentLanguage()];
// const navigate = useNavigate()

export const LoginPage = () => {
  createEffect(() => {
    if (loginStatus() === "success") {
      navigate('/lobby', { replace: true })
      // navigate(`/lobby/${store.auth.random_room}`);
    }
  });

  return (
    <div className="login__page">
      <LoginCard lang={currentPageLocalization} />
    </div>
  );
};
