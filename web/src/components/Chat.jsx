import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { observer } from "mobx-react-lite";
import { store } from "../store/store";

import { ChatMessage } from "../components/ChatMessage";

import emojisIcons from "../utils/smiles.json";

export const Chat = observer(() => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [smilesView, setSmilesView] = useState(false);
  const lastMessageRef = useRef(null);

  const toggleSmilesView = (e) => {
    e.preventDefault();
    setSmilesView(!smilesView);
  };

  const submmitHandler = (e) => {
    e.preventDefault();
    setSmilesView(false);

    console.log("MESSAGE ", e.target.message.value);
    store.chat.sendMessage(e.target.message.value);
    // store.chat.addMessage(store.auth.user, e.target.elements.message.value);
  };

  useEffect(() => {
    if (!store.chat.messages.length) return;
    lastMessageRef.current.scrollIntoView({
      behavior: firstLoad ? "auto" : "smooth",
      block: "end",
      inline: "nearest",
    });
    setFirstLoad(false);
  }, [store.chat.messages]);

  return (
    <div className="chat">
      <div className="header">
        <div className="title">ЧАТ</div>
      </div>

      <ul className="chat__messages">
        {store.chat.messages &&
          store.chat.messages.map((message, index) => (
            <ChatMessage
              key={nanoid()}
              time={message.created}
              author={message.user}
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

        <button className="button">
          <img src="/img/SendIcon.svg" />
        </button>
      </form>
    </div>
  );
});
