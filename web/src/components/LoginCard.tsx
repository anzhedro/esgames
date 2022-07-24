import { login, name, room, avatar, refreshAvatar, setName, setRoom } from "../store/auth";
import { Translation } from "../store/localization";

export const LoginCard = (props: { lang: Translation }) => {
  return (
    <div class="login_card">
      <div class="heading">
        <p>{props.lang.createRoom}</p>
      </div>
      <div class="flex">
        <div class="avatar">
          <div class="wrapper">
            <img src={`/img/${avatar()}.jpg`} alt="" />
            <button onClick={() => refreshAvatar()}>⟳</button>
          </div>
        </div>
        <div class="flex-col">
          <p>{props.lang.loginText}</p>
          <input
            placeholder={props.lang.yourName}
            onKeyDown={(e) => {
              if (e.key === "Enter") login();
            }}
            onChange={(e: any) => {
              setName(e.target.value);
            }}
            value={name()}
            />
          <input
            placeholder={props.lang.roomName}
            onKeyDown={(e) => {
              if (e.key === "Enter") login();
            }}
            onChange={(e: any) => {
              setRoom(e.target.value);
            }}
            value={room()}
          />
        </div>
      </div>
      <div class="footer">
        <button onClick={() => login()} disabled={name().length > 0 ? false : true}>
          <img src="/img/play.svg" /> <span> {props.lang.join}</span>
        </button>
      </div>
    </div>
  );
};
