import { users } from "../store/room";

export const Players = (props: any) => {
  return (
    <div class="players">
      <div class="header">
        <p>
          ИГРОКОВ: <span>{users().length}</span>
        </p>
      </div>
      <div class="content">{props.children}</div>
      <div class="footer"></div>
    </div>
  );
};
