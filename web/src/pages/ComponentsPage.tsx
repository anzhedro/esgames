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

const WordItem = ({ canEdit, color, text }) => {
  const [count, setCount] = useState(0);
  return <div>{text} </div>;
};

const GreenButton = ({ text }: { text: string }) => {
  return <button></button>;
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

  const stageTexts = ['Начать', 'Следующее', 'Закончить', 'Заного'];

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

      <div className="isHost">
        <button onClick={() => setStage(stage + 1)}>+</button>
        <button onClick={() => setStage(stage - 1)}>-</button>
      </div>
      {/* lobby page для пользователя */}

      <WordsList text="Жди" stage={stage}>
        {isStoryteller && (
          <>
            <WordItem canEdit={false} color="green" text="Владилен" />
            <WordItem canEdit={false} color="green" text="Вадилен" />
            <WordItem canEdit={false} color="green" text="Вадиен" />
            <WordItem canEdit={false} color="red" text="Вадим" />
          </>
        )}

        <GreenButton text={stage ==  } />
      </WordsList>

      {/* <LobbyPage /> */}
    </div>
  );
};
