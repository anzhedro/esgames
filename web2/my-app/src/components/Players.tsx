import { users } from "../store/room";

interface PlayersProps {
  children: JSXElement;
}

export const Players = (props: PlayersProps) => {
  return (
    <div class="players">
      <div class="header">
        <p>
          ИГРОКОВ: <span>{users.length}</span>
        </p>
      </div>
      <div class="content">{props.children}</div>
      <div class="footer">
        {/* <button class="active">ИГРОКИ</button>
        <button disabled>ЗРИТЕЛИ</button> */}
      </div>
    </div>
  );
};
