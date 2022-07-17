import React, { useState } from "react";
import { useParams } from "react-router-dom";

const games = [
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
  {
    image: "/img/hat.png",
    title: "шляпа",
  },
];

const copyToClipboard = (str: string) => {
  navigator.clipboard.writeText(str);
};

export const GamesTable = () => {
  const [mode, setMode] = useState("select");
  const params = useParams();

  return (
    <div className="games_table">
      {mode === "select" ? (
        <>
          <div className="header">ИГРЫ</div>

          <div className="content">
            {games.map((game) => (
              <div className="game_card" onClick={() => setMode("rules")}>
                <img src={game.image} />
                <p>{game.title}</p>
              </div>
            ))}
          </div>
          <div className="footer">
            <button
              onClick={() =>
                copyToClipboard("localhost:3000/lobby/" + params.id)
              }
            >
              ПРИГЛАСИТЬ
            </button>
          </div>
        </>
      ) : (
        false
      )}
      {mode === "rules" ? (
        <>
          <div className="header">НАСТРОЙКА</div>
          <div className="footer">
            <button onClick={() => setMode("select")}>НАЗАД</button>
            <button onClick={() => setMode("play")}>НАЧАТЬ</button>
          </div>
        </>
      ) : (
        false
      )}
    </div>
  );
};
