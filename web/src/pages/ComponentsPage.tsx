import { createSignal, JSXElement, Show } from 'solid-js';
import { skipWord } from '../games/Hat';

export const WordsList = (props: { children: JSXElement }) => (
  <div class="wordsList">{props.children}</div>
);

type WordItemProps = {
  canEdit?: boolean;
  color?: string | '';
  text?: string | '';
  countInit?: number | 0;
  isShowSkip?: boolean | false;
  ref: any;
};

const [isHost, setIsHost] = createSignal(false);

export const WordItem = (props: WordItemProps) => {
  const [count, setCount] = createSignal(props.countInit || 0);

  const colorFromCount = () => {
    // if (!canEdit && color) return color;
    // return color;
    if (count() === 0) return 'white';
    if (count() > 0) return 'green';
    return 'red';
  };

  return (
    <div class="wordItemWrapper" ref={props.ref}>
      <div class={`wordItem ${colorFromCount()}`}>
        <p> {props.text}</p>
        <Show when={props.isShowSkip}>
          {/* button skip */}
          <button class="skipWordBtn" onclick={skipWord}>
            skip
          </button>
        </Show>

        <Show when={props.canEdit}>
          <div>
            <button onClick={() => setCount(count() + 1)}>+</button>
            <p>{count()}</p>
            <button onClick={() => setCount(count() - 1)}>-</button>
          </div>
        </Show>
      </div>
    </div>
  );
};

export const GreenButton = ({ text }: { text: string }) => (
  <button class="green_btn">{text}</button>
);

export const ComponentsPage = () => {
  const [isStoryteller, setIsStoryteller] = createSignal(false);

  const toggleIsHost = () => {
    setIsHost(!isHost());
  };

  const toggleStoryTeller = () => {
    setIsStoryteller(!isStoryteller());
  };

  const stageTexts = ['Начать', 'Следующее', 'Закончить', 'Заново'];

  return (
    <div class="components_page">
      <div class="isHost">
        <button onClick={toggleIsHost}>я хост</button>
        <button onClick={toggleIsHost}>я не хост</button>
      </div>

      <div class="isHost">
        <button onClick={toggleStoryTeller}>
          я {!isStoryteller() && 'не'} рассказчик
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '50px' }}>
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
            <WordItem
              canEdit={true}
              color="green"
              text="Владилен"
              countInit={1}
            />
            <WordItem
              canEdit={true}
              color="green"
              text="Вадилен"
              countInit={1}
            />
            <WordItem
              canEdit={true}
              color="green"
              text="Вадиен"
              countInit={0}
            />
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
