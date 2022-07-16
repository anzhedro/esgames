import React from "react";
import { useState, useRef } from "react";
const images: string[] = [];

export const LoginCard = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState(1);

  const refreshAvatar = () => {
    let newIdx = avatar == 25 ? 1 : avatar + 1;
    setAvatar(newIdx);
  };

  const login = () => {
    const nickname = inputRef?.current?.value;
    if (nickname && nickname.length > 3) {
      // login logic
    }
  };

  return (
    <div className="login_card">
      <img src="./img/1.jpg" alt="" style={{height: '200px', width: '200px'}} />

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
          <input placeholder="ВАШЕ ИМЯ" ref={inputRef} />
        </div>
      </div>
      <div className="footer">
        <button onClick={() => login()}>
          <span>◁</span> ВОЙТИ
        </button>
      </div>
    </div>
  );
};
