import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chat } from "../components/Chat";
import { GamesTable } from "../components/GamesTable";
import { Players } from "../components/Players";
import { store } from "../store/store";

export const LobbyPage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    // const localUser =
    store.auth.tryLogin();
  }, []);

  
  useEffect(() => {
    // console.log(store.auth.login_status)
    if (store.auth.login_status === "fail") {
      console.log('imhere')
      navigate("/");
    }
  }, [store.auth.login_status]);

  return (
    <div className="lobby_page">
      {store.auth.login_status === "success" ? (
        <div className="wrapper">
          <Players />
          <GamesTable />
          <Chat />
        </div>
      ) : (
        "loading.."
      )}
    </div>
  );
})