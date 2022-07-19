import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import players from "../utils/players.json";
import teamsMock from "../utils/teams.json";
import { IPlayer } from "../utils/types";
import { observer } from "mobx-react-lite";
import { store } from "../store/store";

export const Players = observer(() => {
  const [teams, setTeams] = useState(teamsMock);

  const updLastTeam = (newTeams) => {
    const teams = newTeams.filter((team: IPlayer[]) => team.length > 0);
    setTeams([...teams, []]);
  };

  const handleSelectTeam = (idx: number) => {
    const oldTeams = [...teams];
    const me = {
      name: "sss",
      avatarId: "2",
      type: "player",
    };

    let newTeams = oldTeams.map(
      (team, i) => (team = team.filter((p) => p.name !== me.name))
    );
    newTeams[idx].push(me);

    setTeams(newTeams);

    updLastTeam(newTeams);
  };

  return (
    <div className="players">
      <div className="header">
        <p>
          ИГРОКОВ: <span>{players.length}</span>
        </p>
      </div>
      <div className="content">
        {/* {teams.map((team, idx) => (
          <div className="team" key={nanoid()}>
            <button className="team_btn" onClick={() => handleSelectTeam(idx)}>
              team {idx}
            </button>
            {team.map((player: any, index: number) => (
              <div
                key={nanoid()}
                className={index & 2 ? "player bg-dark" : "player "}
              >
                <Avatar avatarId={player.avatarId} type={player.type} />
                <p>{player.name}</p>
              </div>
            ))}
          </div>
        ))} */}

        {store.room.users.map((user, index) => (
          // user;
          <div
            key={nanoid()}
            className={index & 2 ? "player bg-dark" : "player "}
          >
            <Avatar avatar={user.avatar} isHost={user.is_host} />
            <p>{user.name}</p>
          </div>
        ))}
      </div>
      <div className="footer">
        <button className="active">ИГРОКИ</button>
        <button disabled>ЗРИТЕЛИ</button>
      </div>
    </div>
  );
});
