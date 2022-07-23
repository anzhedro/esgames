import { nanoid } from "nanoid";
import { Avatar } from "./Avatar";
import { IPlayer } from "../utils/types";
import { createStore } from "solid-js/store";
import { For } from "solid-js";

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

export const PlayersTeams = () => {
  const [teams, setTeams] = createStore<IPlayer[][]>(teamsMock);

  const updLastTeam = (newTeams: IPlayer[][]) => {
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
      {/* for */}
      <For each={teams.filter((el: IPlayer[], idx: number) => idx > 0)} fallback={<div>Loading...</div>}>
        {(team: IPlayer[], idx) => (
          <div class="team">
            <button class="team_btn" onClick={() => handleSelectTeam(+idx)}>
              team {+idx + 1}
            </button>
            {team.map((player: IPlayer, index: number) => (
              <div class={index & 2 ? "player bg-dark" : "player "}>
                <Avatar avatar={player.avatar} isHost={player.is_host} />
                <p>{player.name}</p>
              </div>
            ))}
          </div>
        )}
      </For>

      <div class="team">
        <button class="team_btn" onClick={() => handleSelectTeam(0)}>
          зрители
        </button>

        <For each={teams[0]} fallback={<div>Loading...</div>}>
          {(player: IPlayer, idx) => (
            <div class={+idx & 2 ? "player bg-dark" : "player "}>
              <Avatar avatar={player.avatar} isHost={player.is_host} />
              <p>{player.name}</p>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
