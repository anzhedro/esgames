import { createEffect, For, Show } from "solid-js";
import { WordItem, WordsList } from "../pages/ComponentsPage";
import {
  handleClick,
  roundTime,
  roundWords,
  setTextInButton,
  textInButton,
  timer,
} from "../store/hatDemo";
import { sendGameAction, setShowButton, showButton } from "../store/room";


type GamePlayProps = {
  isDemo?: boolean;
};

export const GamePlay = (props: GamePlayProps) => {
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

  return (
    <>
      <Show
        when={props.isDemo}
        fallback={
          <Show when={showButton()} fallback={<div></div>}>
            <div class="demo_alias">
              <div class="central_column">
                <button
                  class="green_btn"
                  onClick={() => {
                    sendGameAction("click");
                    setShowButton(false);
                  }}
                >
                  CLICK
                </button>
              </div>
            </div>
          </Show>
        }
      >
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
