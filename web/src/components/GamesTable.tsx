import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { copyToClipboard } from "../utils/helpers";
import games from "../utils/games.json";
import { GamesList } from "./GamesList";
import { GameRules } from "./GameRules";
import { GamePlay } from "./GamePlay";

export const GamesTable = () => {
  const [mode, setMode] = useState("select");
  const params = useParams();

  return (
    <div className="games_table">
      <div className="games_table_wrapper">
        {mode === "select" && <GamesList games={games} id={params.id} setMode={setMode} />}
        {mode === "rules" && <GameRules setMode={setMode} />}
        {mode === "play" && <GamePlay game={""} />}
      </div>
    </div>
  );
};
