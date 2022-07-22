import React from "react";
import { observer } from "mobx-react-lite";
import { store } from "../store/store";

interface Props {
  children: React.ReactNode;
}

export const Players: React.FC<Props> = observer(({ children }) => {
  return (
    <div className="players">
      <div className="header">
        <p>
          ИГРОКОВ: <span>{store.room.users.length}</span>
        </p>
      </div>
      <div className="content">{children}</div>
      <div className="footer">
        {/* <button className="active">ИГРОКИ</button>
        <button disabled>ЗРИТЕЛИ</button> */}
      </div>
    </div>
  );
});
