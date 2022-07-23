import { randomInteger } from "../utils/helpers";

export const Avatar = ({ avatar = randomInteger(1,25), isHost = false }) => {
  return (
    <div class="avatar">
      {isHost ? <img src="/img/crown.svg" class="host-indicator" /> : false}
      <img src={`/img/${avatar}.jpg`} alt="avatar.jpg" />
    </div>
  );
};
