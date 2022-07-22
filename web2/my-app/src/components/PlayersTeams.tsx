import { nanoid } from "nanoid";
import React, { useState } from "react";
import { Avatar } from "./Avatar";
import { IPlayer } from "../utils/types";
import { observer } from "mobx-react-lite";

const teamsMock = [
  [
    {
      name: "Soth",
      avatar: 16,
      is_host: true,
    },
    {
      name: "John Doe",
      avatar: 2,
      is_host: false,
    },
  ],
  [
    {
      name: "Soth",
      avatar: 16,
      is_host: false,
    },
  ],
  [],
];

export const PlayersTeams = observer(() => {
  const [teams, setTeams] = useState<IPlayer[][]>(teamsMock);

  const updLastTeam = (newTeams) => {
    const teams = newTeams.filter((team: IPlayer[]) => team.length > 0);
    setTeams([...teams, []]);
  };

  const handleSelectTeam = (idx: number) => {
    const oldTeams = [...teams];
    const me = {
      name: "sss",
      avatar: 2,
      is_host: false,
    };

    let newTeams = oldTeams.map((team, i) => (team = team.filter((p) => p.name !== me.name)));
    newTeams[idx].push(me);

    setTeams(newTeams);
    updLastTeam(newTeams);
  };
  return (
    <div>
      {teams
        .filter((el: IPlayer[], idx: number) => idx > 0)
        .map((team, idx) => (
          <div className="team" key={nanoid()}>
            <button className="team_btn" onClick={() => handleSelectTeam(idx)}>
              team {idx + 1}
            </button>
            {team.map((player: IPlayer, index: number) => (
              <div key={nanoid()} className={index & 2 ? "player bg-dark" : "player "}>
                <Avatar avatar={player.avatar} isHost={player.is_host} />
                <p>{player.name}</p>
              </div>
            ))}
          </div>
        ))}

      <div className="team">
        <button className="team_btn" onClick={() => handleSelectTeam(0)}>
          зрители
        </button>
        {teams[0].map((player, index) => (
          <div key={nanoid()} className={index & 2 ? "player bg-dark" : "player "}>
            <Avatar avatar={player.avatar} isHost={player.is_host} />
            <p>{player.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
});
