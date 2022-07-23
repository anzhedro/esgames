import { createEffect, createSignal } from "solid-js";
import { login } from "../store/auth";
import { randomInteger } from "../utils/helpers";

export const LoginCard = (props: { lang: any }) => {
  const [avatar, setAvatar] = createSignal(randomInteger(1, 25));
  const [nickname, setNickname] = createSignal("");

  const refreshAvatar = () => {
    let newIdx = avatar() == 25 ? 1 : avatar() + 1;
    setAvatar(newIdx);
  };

  return (
    <div class="login_card">
      <div class="heading">
        <p>{props.lang.createRoom}</p>
      </div>
      <div class="flex">
        <div class="avatar">
          <div class="wrapper">
            <img src={"./img/" + avatar() + ".jpg"} alt="" />
            <button onClick={() => refreshAvatar()}>⟳</button>
          </div>
        </div>
        <div class="flex-col">
          <p>{props.lang.selectAvatar}</p>
          <input
            placeholder={props.lang.yourName}
            onKeyDown={(e) => {
              if (e.key === "Enter") login(nickname(), avatar());
            }}
            onChange={(e: any) => {
              setNickname(e.target.value);
            }}
          />
        </div>
      </div>
      <div class="footer">
        <button onClick={() => login(nickname(), avatar())} disabled={nickname().length > 0 ? false : true}>
          <img src="/img/play.svg" /> <span> {props.lang.join}</span>
        </button>
      </div>
    </div>
  );
};
