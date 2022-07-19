import React from "react";
import { useState, useRef } from "react";
import { store } from "../store/store";
import { randomInteger } from "../utils/helpers";

export const LoginCard = ({ lang }) => {
  const [avatar, setAvatar] = useState(randomInteger(1, 25));
  const [nickname, setNickname] = useState("");

  const refreshAvatar = () => {
    let newIdx = avatar == 25 ? 1 : avatar + 1;
    setAvatar(newIdx);
  };

  return (
    <div className="login_card">
      <div className="heading">
        <p>{lang.createRoom}</p>
      </div>
      <div className="flex">
        <div className="avatar">
          <div className="wrapper">
            <img src={"./img/" + avatar + ".jpg"} alt="" />
            <button onClick={() => refreshAvatar()}>⟳</button>
          </div>
        </div>
        <div className="flex-col">
          <p>{lang.selectAvatar}</p>
          <input
            placeholder={lang.yorName}
            onKeyDown={(e) => {
              if (e.key === "Enter") store.auth.login(nickname);
            }}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="footer">
        <button onClick={() => store.auth.login(nickname, avatar)} disabled={nickname.length > 0 ? false : true}>
          <img src="/img/play.svg" /> <span> {lang.join}</span>
        </button>
      </div>
    </div>
  );
};
