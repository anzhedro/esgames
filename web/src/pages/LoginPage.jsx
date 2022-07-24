import { createEffect } from "solid-js";
import { LoginCard } from "../components/LoginCard";
import { useNavigate } from "solid-app-router";
import { currentLanguage, localizationMap } from "../store/localization";
import { loginStatus, room } from "../store/auth";

const currentPageLocalization = localizationMap[currentLanguage()];

export const LoginPage = () => {
  const navigate = useNavigate();

  createEffect(() => {
    if (loginStatus() === "success") {
      navigate(`/room/${room()}`);
    }
  });

  return (
    <div className="login__page">
      <LoginCard lang={currentPageLocalization} />
    </div>
  );
};
