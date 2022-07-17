import React from "react";
import { useState, useRef } from "react";
import { randomInteger } from "../utils/helpers";
const images: string[] = [];

export const LoginCard = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState(randomInteger(1, 25));
  const [nickname, setNickname] = useState("");

  const refreshAvatar = () => {
    let newIdx = avatar == 25 ? 1 : avatar + 1;
    setAvatar(newIdx);
  };

  const login = () => {
    // login logic
    console.log(nickname, " login..");
  };

  return (
    <div className="login_card">
      <div className="heading">
        <p>СОЗДАТЬ КОМНАТУ!</p>
      </div>
      <div className="flex">
        <div className="avatar">
          <div className="wrapper">
            <img src={"./img/" + avatar + ".jpg"} alt="" />
            <button onClick={() => refreshAvatar()}>⟳</button>
          </div>
        </div>
        <div className="flex-col">
          <p>ВЫБЕРИ АВАТАР И ИМЯ</p>
          <input
            placeholder="ВАШЕ ИМЯ"
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
      </div>
      <div className="footer">
        <button
          onClick={() => login()}
          disabled={nickname.length > 0 ? false : true}
        >
          ▶ ВОЙТИ
        </button>
      </div>
    </div>
  );
};
