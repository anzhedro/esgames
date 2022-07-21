import React, { FormEvent, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { observer } from "mobx-react-lite";
import { store } from "../store/store";
import { ChatMessage } from "./ChatMessage";
import emojisIcons from "../utils/smiles.json";

export const Chat = observer(() => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [smilesView, setSmilesView] = useState(false);
  const lastMessageRef = useRef<null | HTMLLIElement>(null);

  const toggleSmilesView = (e: React.MouseEvent) => {
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
    <div className="chat">
      <div className="header">
        <div className="title">ЧАТ</div>
      </div>

      <ul className="chat__messages">
        {store.chat.messages &&
          store.chat.messages.map((message) => (
            <ChatMessage
              key={nanoid()}
              created={message.created}
              user={message.user}
              text={message.text}
              ref={lastMessageRef}
            />
          ))}
      </ul>

      {smilesView ? (
        <div className="smiles-board">
          <div className="smiles-board-list">
            {emojisIcons.map((icon) => (
              <button key={icon} onClick={() => store.chat.addSmile(icon)}>
                <span>{icon}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        false
      )}

      <form className="chat-form" onSubmit={submmitHandler} autoComplete="off">
        <input
          className={"input " + (store.auth.login_status === "fail" ? "input--error" : "")}
          type="text"
          id={"message"}
          value={store.chat.message}
          onChange={(e) => store.chat.typeMessage(e)}
          placeholder="Ваше сообщение..."
        />

        <button type="button" className="button" onClick={(e) => toggleSmilesView(e)}>
          <img src="/img/EmojisIcon.svg" />
        </button>
      </form>
    </div>
  );
});
