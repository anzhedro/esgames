import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { Input } from "../components/input";
import { Title } from "../components/Title";
import { store } from "../store/store";

export const LoginPage = observer(() => {
  const navigate = useNavigate();
  const submmitHandler = (e) => {
    e.preventDefault();
    if (!nickname) return;

    console.log("submit");
    store.auth.login(nickname);

    // navigate("/chat/1");
  };

  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (store.auth.login_status === "success") {
      navigate("/chat/1");
    }
  }, [store.auth.login_status]);

  const changeHandler = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div className="login__page">
      <div className="container">
        <Title> LOGIN </Title>
        <Avatar />
        <form onSubmit={submmitHandler}>
          <Title>
            <label htmlFor="nickname">Username:</label>
          </Title>
          <Input id="nickname" placeholder="Your name..." fn={changeHandler} text={nickname} />
          <Button>Login</Button>
        </form>
      </div>
    </div>
  );
});
