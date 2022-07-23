import { ChatMessage } from "./ChatMessage";
import emojisIcons from "../utils/smiles.json";
import { IMessage } from "../utils/types";
import { createEffect, createSignal, For } from "solid-js";
import { addSmile, message, messages, sendMessage, setMessage } from "../store/chat";
import { loginStatus } from "../store/auth";

export const Chat = () => {
  const [firstLoad, setFirstLoad] = createSignal(true);
  const [smilesView, setSmilesView] = createSignal(false);
  // const lastMessageRef = useRef<null | HTMLLIElement>(null);
  let lastMessageRef:any = null;
 
  const toggleSmilesView = (e: MouseEvent) => {
    e.preventDefault();
    setSmilesView(!smilesView);
  };

  const submmitHandler = (e: any) => {
    e.preventDefault();
    setSmilesView(false);
    sendMessage(lastMessageRef.current.value);
  };

  const scrollToEnd = () => {
    if (messages().length === 0) return;
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: firstLoad() ? "auto" : "smooth",
        block: "end",
        inline: "nearest",
      });
      setFirstLoad(false);
    }
  };

  createEffect(() => {
    scrollToEnd();
  }, [messages()]);

  return (
    <div class="chat">
      <div class="header">
        <div class="title">ЧАТ</div>
      </div>

      <ul class="chat__messages">
        <For each={messages()} fallback={<div>Loading...</div>}>
          {(message:IMessage) => <ChatMessage created={message.created} user={message.user} text={message.text} ref={lastMessageRef} />}
        </For>
      </ul>

      {smilesView() ? (
        <div class="smiles-board">
          <div class="smiles-board-list">
            {emojisIcons.map((icon: string) => (
              <button onClick={() => addSmile(icon)}>
                <span>{icon}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        false
      )}

      <form class="chat-form" onSubmit={submmitHandler} autocomplete="off">
        <input
          class={"input " + (loginStatus() === "fail" ? "input--error" : "")}
          type="text"
          id={"message"}
          value={message()}
          onChange={(e: any) => setMessage(e.target.value)}
          placeholder="Ваше сообщение..."
        />

        <button type="button" class="button" onClick={(e) => toggleSmilesView(e)}>
          <img src="/img/EmojisIcon.svg" />
        </button>
      </form>
    </div>
  );
};
