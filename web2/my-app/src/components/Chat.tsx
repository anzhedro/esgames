import React, { FormEvent, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { store } from "../store/store";
import { ChatMessage } from "./ChatMessage";
import emojisIcons from "../utils/smiles.json";
import { IMessage } from "../utils/types";

export const Chat = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [smilesView, setSmilesView] = useState(false);
  // const lastMessageRef = useRef<null | HTMLLIElement>(null);
  let lastMessageRef: any;

  const toggleSmilesView = (e: MouseEvent) => {
    e.preventDefault();
    setSmilesView(!smilesView);
  };

  const submmitHandler = (e: FormEvent) => {
    e.preventDefault();
    setSmilesView(false);
    store.chat.sendMessage(store.chat.message);
  };

  const scrollToEnd = () => {
    if (store.chat.messages.length === 0) return;
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: firstLoad ? "auto" : "smooth",
        block: "end",
        inline: "nearest",
      });
      setFirstLoad(false);
    }
  };

  useEffect(() => {
    scrollToEnd();
  }, [store.chat.messages]);

  return (
    <div class="chat">
      <div class="header">
        <div class="title">ЧАТ</div>
      </div>

      <ul class="chat__messages">
        {store.chat.messages &&
          store.chat.messages.map((message: IMessage) => (
            <ChatMessage created={message.created} user={message.user} text={message.text} ref={lastMessageRef} />
          ))}
      </ul>

      {smilesView ? (
        <div class="smiles-board">
          <div class="smiles-board-list">
            {emojisIcons.map((icon: string) => (
              <button onClick={() => store.chat.addSmile(icon)}>
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
          class={"input " + (store.auth.login_status === "fail" ? "input--error" : "")}
          type="text"
          id={"message"}
          value={store.chat.message}
          onChange={(e: any) => store.chat.setMessage(e.target.value)}
          placeholder="Ваше сообщение..."
        />

        <button type="button" class="button" onClick={(e) => toggleSmilesView(e)}>
          <img src="/img/EmojisIcon.svg" />
        </button>
      </form>
    </div>
  );
};
