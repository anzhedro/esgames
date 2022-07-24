import { createSignal, JSX, JSXElement } from "solid-js";
import { WordItemProps } from "../utils/types";

const WordsList = (props: { children: JSXElement }) => {
  return <div>{props.children}</div>;
};

const WordItem = ({ canEdit, color = "", text, countInit = 0 }: WordItemProps) => {
  const [count, setCount] = createSignal(countInit);
  const colorFromCount = () => {
    if (!canEdit && color) return color;
    // return color;
    if (count() === 0) return "grey";
    if (count() > 0) return "green";
    if (count() < 0) return "red";
  };

  return (
    <div class={"wordItem " + colorFromCount()}>
      <p> {text}</p>
      {canEdit && (
        <div>
          <button onClick={() => setCount(count() + 1)}>+</button>
          <p>{count()}</p>
          <button onClick={() => setCount(count() - 1)}>-</button>
        </div>
      )}
    </div>
  );
};

const GreenButton = ({ text }: { text: string }) => {
  return <button class="green_btn">{text}</button>;
};

export const ComponentsPage = () => {
  const [isHost, setIsHost] = createSignal(false);
  // const [stage, setStage] = createSignal(0);
  const [isStoryteller, setIsStoryteller] = createSignal(false);

  const toggleIsHost = () => {
    setIsHost(!isHost());
  };

  const toggleStoryTeller = () => {
    setIsStoryteller(!isStoryteller());
  };

  const stageTexts = ["Начать", "Следующее", "Закончить", "Заного"];

  return (
    <div class="components_page">
      {/* <LoginCard /> */}
      <div class="isHost">
        <button onClick={toggleIsHost}>я хост</button>
        <button onClick={toggleIsHost}>я не хост</button>
      </div>

      <div class="isHost">
        <button onClick={toggleStoryTeller}>я {!isStoryteller() && "не"} рассказчик</button>
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
            <WordItem canEdit={true} color="green" text="Владилен" countInit={1} />
            <WordItem canEdit={true} color="green" text="Вадилен" countInit={1} />
            <WordItem canEdit={true} color="green" text="Вадиен" countInit={0} />
            <WordItem canEdit={true} color="red" text="Вадим" countInit={-1} />
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
