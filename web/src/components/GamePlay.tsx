import { createEffect, createSelector, createSignal, For, Show } from "solid-js";
import { GreenButton, WordItem, WordsList } from "../pages/ComponentsPage";
import {
  handleClick,
  roundTime,
  roundWords,
  setTextInButton,
  skipWord,
  startGame,
  textInButton,
  timer,
} from "../store/hatDemo";

type GamePlayProps = {
  isDemo?: boolean;
};

export const GamePlay = (props: GamePlayProps) => {
  const [stage, setStage] = createSignal(0);
  let lastWordRef: any = null;

  createEffect(() => {
    setTimeout(() => {
      setTextInButton("Старт");
    }, 1000);
  });

  const scrollToEnd = () => {
    if (roundWords().length === 0) return;
    lastWordRef.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  createEffect(() => {
    scrollToEnd();
  });

  return (
    <>
      <Show when={props.isDemo}>
        <div class="demo_alias">
          <div class="central_column">
            <WordsList>
              <For each={roundWords()}>
                {(word: any, index) => (
                  <WordItem
                    ref={lastWordRef}
                    canEdit={false}
                    countInit={word.state}
                    color="green"
                    text={word.word}
                    isShowSkip={index() == roundWords().length - 1}
                  />
                )}
              </For>
            </WordsList>

            <Show when={timer() !== roundTime()}>
              <div class="timer">{timer()}</div>
            </Show>

            <div>
              <button class="green_btn" onclick={handleClick}>
                {textInButton()}
              </button>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
};
