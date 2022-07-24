import { ChatMessage } from "./ChatMessage";
import emojisIcons from "../utils/smiles.json";
import { IMessage } from "../utils/types";
import { createEffect, createSignal, For } from "solid-js";
import { chatInput, messages, sendMessage, setChatInput } from "../store/chat";
import { appState } from "../store/state";
import { Translation } from "../store/localization";

export const Chat = (props: { lang: Translation }) => {
  const [firstLoad, setFirstLoad] = createSignal(true);
  const [smilesView, setSmilesView] = createSignal(false);
  // const lastMessageRef = useRef<null | HTMLLIElement>(null);
  let lastMessageRef: any = null;

  const toggleSmilesView = (e: MouseEvent) => {
    e.preventDefault();
    setSmilesView(!smilesView());
  };

  const submmitHandler = (event: Event): void => {
    event.preventDefault();
    setSmilesView(false);
    // sendMessage(lastMessageRef.current.value);
    sendMessage();
  };

  const scrollToEnd = () => {
    if (messages().length === 0) return;
    // if (lastMessageRef && lastMessageRef.current) {
    console.log(lastMessageRef);
    // lastMessageRef.current.scrollIntoView({
    //   behavior: firstLoad() ? "auto" : "smooth",
    //   block: "end",
    //   inline: "nearest",
    // });
    // setFirstLoad(false);
    // }
  };

  createEffect(() => {
    scrollToEnd();
  });

  return (
    <div class="chat">
      <div class="header">
        <div class="title">ЧАТ</div>
      </div>

      <ul class="chat__messages">
        <For each={messages()} fallback={
          <span class="no_messages">{props.lang.nomessages}</span>
        }>{(message: IMessage) => (
              <ChatMessage created={message.created} user={message.user} text={message.text} ref={lastMessageRef} />
            )}
        </For>
      </ul>

      {smilesView() ? (
        <div class="smiles-board">
          <div class="smiles-board-list">
            <For each={emojisIcons} fallback={<div>Loading...</div>}>
              {(emoji: any) => <button onClick={() => setChatInput(`${chatInput()} ${emoji}`)}>{emoji}</button>}
            </For>
          </div>
        </div>
      ) : (
        false
      )}

      <form class="chat-form" onSubmit={submmitHandler} autocomplete="off">
        <input
          class={"input " + (appState() === "connected" ? "" : "input--error")}
          type="text"
          id={"message"}
          value={chatInput()}
          onChange={(e: any) => setChatInput(e.target.value)}
          placeholder="Ваше сообщение..."
        />

        <button type="button" class="button" onClick={(e) => toggleSmilesView(e)}>
          <img src="/img/EmojisIcon.svg" />
        </button>
      </form>
    </div>
  );
};
