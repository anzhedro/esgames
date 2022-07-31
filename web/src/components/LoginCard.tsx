import {
  login, name, room, avatar, setRandomAvatar, setName, setRoom,
} from '../store/state';
import { Translation } from '../store/localization';

export const LoginCard = (props: { lang: Translation }) => (
    <div class="login_card">
      <div class="heading">
        <p>{room() === '' ? props.lang.createRoom : props.lang.joinRoom}</p>
      </div>
      <div class="flex">
        <div class="avatar">
          <div class="wrapper">
            <img src={`/img/${avatar()}.jpg`} alt="" />
            <button onClick={() => setRandomAvatar()}>⟳</button>
          </div>
        </div>
        <div class="flex-col">
          <p>{props.lang.loginText}</p>
          <input
            placeholder={props.lang.yourName}
            onKeyUp={(e) => {
              setName(e.currentTarget.value);
              if (e.key === 'Enter') login();
            }}
            value={name()}
          />
          <input
            placeholder={props.lang.roomName}
            onKeyUp={(e) => {
              setRoom(e.currentTarget.value);
              if (e.key === 'Enter') login();
            }}
            value={room()}
          />
        </div>
      </div>
      <div class="footer">
        <button onClick={() => login()} disabled={!(name().length > 0)}>
          <img src="/img/play.svg" />
          <span>{room() === '' ? props.lang.create : props.lang.join}</span>
        </button>
      </div>
    </div>
);
