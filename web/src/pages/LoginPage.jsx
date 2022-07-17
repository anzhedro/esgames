import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { LoginCard } from "../components/LoginCard";

export const LoginPage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (store.auth.login_status === "success") {
      navigate("/lobby/zxc");
    }
  }, [store.auth.login_status]);

  return (
    <div className="login__page">
      <LoginCard />
    </div>
  );
});
