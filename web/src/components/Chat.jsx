import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { observer } from "mobx-react-lite";
import { store } from "../store/store";

import { ChatMessage } from "../components/ChatMessage";
import { Button } from "../components/Button";
import { Input } from "../components/input";
import { Title } from "../components/Title";

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
    store.chat.addMessage(store.auth.user, e.target.elements.message.value);
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
        <Title> ЧАТ </Title>
      </div>

      <ul className="chat__messages">
        {store.chat.messages &&
          store.chat.messages.map((message, index) => (
            <ChatMessage
              key={nanoid()}
              time={message.time}
              author={message.author}
              text={message.text}
              ref={lastMessageRef}
            />
          ))}
      </ul>

      {smilesView ? (
        <div className="smiles-board">
          <div className="smiles-board-list">
            {emojisIcons.map((icon) => (
              <Button key={icon} fn={() => store.chat.addSmile(icon)}>
                <span>{icon}</span>
              </Button>
            ))}
          </div>
        </div>
      ) : (
        false
      )}

      <form className="chat-form" onSubmit={submmitHandler} autoComplete="off">
        <Input
          id="message"
          placeholder="Ваше сообщение..."
          fn={store.chat.typeMessage}
          text={store.chat.message}
        />
        <Button fn={(e) => toggleSmilesView(e)}>
          <img src="/img/EmojisIcon.svg" />
        </Button>
        <Button>
          <img src="/img/SendIcon.svg" />
        </Button>
      </form>
    </div>
  );
});
