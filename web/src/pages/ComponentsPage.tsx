import React from "react";
import { useState } from "react";
import { LoginCard } from "../components/LoginCard";
import { Players } from "../components/Players";
import { store } from "../store/store";
import { LobbyPage } from "./LobbyPage";
// import React from "@types/react";

const WordsList = ({ children }) => {
  return <div>{children}</div>;
};

const WordItem = ({ canEdit, color = "", text, countInit = 0 }) => {
  const [count, setCount] = useState(countInit);
  const colorFromCount = () => {
    if (!canEdit && color) return color;
    // return color;
    if (count === 0) return "grey";
    if (count > 0) return "green";
    if (count < 0) return "red";
  };

  return (
    <div className={"wordItem " + colorFromCount()}>
      <p> {text}</p>
      {canEdit && (
        <div>
          <button onClick={() => setCount(count + 1)}>+</button>
          <p>{count}</p>
          <button onClick={() => setCount(count - 1)}>-</button>
        </div>
      )}
    </div>
  );
};

const GreenButton = ({ text }: { text: string }) => {
  return <button className="green_btn">{text}</button>;
};

export const ComponentsPage = () => {
  const [stage, setStage] = useState(0);
  const [isStoryteller, setIsStoryteller] = useState(false);

  const toggleIsHost = () => {
    store.auth.isHost = !store.auth.isHost;
  };

  const toggleStoryTeller = () => {
    setIsStoryteller(!isStoryteller);
  };

  const stageTexts = ["Начать", "Следующее", "Закончить", "Заного"];

  return (
    <div className="components_page">
      {/* <LoginCard /> */}
      <div className="isHost">
        <button onClick={toggleIsHost}>я хост</button>
        <button onClick={toggleIsHost}>я не хост</button>
      </div>

      <div className="isHost">
        <button onClick={toggleStoryTeller}>я {!isStoryteller && "не"} рассказчик</button>
      </div>

      {/* <div className="isHost">
        <button onClick={() => setStage(stage + 1)}>+</button>
        <button onClick={() => setStage(stage - 1)}>-</button>
      </div> */}
      {/* lobby page для пользователя */}

      <div style={{ display: "flex", alignItems: "flex-end", gap: "50px" }}>
        <WordsList>
          <GreenButton text="Ждите" />
        </WordsList>

        <WordsList>
          {/* {isStoryteller && ( */}
          <>
            <WordItem canEdit={false} color="green" text="Владилен" />
            <WordItem canEdit={false} color="green" text="Вадилен" />
            <WordItem canEdit={false} color="green" text="Вадиен" />
            <WordItem canEdit={false} color="red" text="Вадим" />
          </>
          {/* )} */}

          <GreenButton text="Далее" />
        </WordsList>

        <WordsList>
          {/* {isStoryteller && ( */}
          <>
            <WordItem canEdit={true} color="green" text="Владилен" countInit={1}/>
            <WordItem canEdit={true} color="green" text="Вадилен" countInit={1}/>
            <WordItem canEdit={true} color="green" text="Вадиен"countInit={0} />
            <WordItem canEdit={true} color="red" text="Вадим" countInit={-1}/>
          </>
          {/* )} */}

          <GreenButton text="Раунд 2" />
        </WordsList>

        <WordsList>
          {/* {isStoryteller && ( */}
          <>
            <WordItem canEdit={false} color="green" text="Team 1 50" />
            <WordItem canEdit={false} color="red" text="Team 2 49" />
          </>
          {/* )} */}

          <GreenButton text="Тима 1 вин" />
        </WordsList>

        {/* <LobbyPage /> */}
      </div>
    </div>
  );
};
