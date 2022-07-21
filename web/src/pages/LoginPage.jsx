import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { LoginCard } from "../components/LoginCard";
import { store } from "../store/store";

export const LoginPage = observer(() => {
  const navigate = useNavigate();
  const currentPageLocalization = store.lang.localizationMap[store.lang.currentLanguage]["/"];

  useEffect(() => {
    if (store.auth.login_status === "success") {
      navigate(`/lobby/${store.auth.random_room}`);
    }
  }, [store.auth.login_status]);

  return (
    <div className="login__page">
      <LoginCard lang={currentPageLocalization} />
    </div>
  );
});
