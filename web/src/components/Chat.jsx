import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { observer } from "mobx-react-lite";

import { ChatMessage } from "../components/ChatMessage";
import { Button } from "../components/Button";
import { Input } from "../components/input";
import { Title } from "../components/Title";
import { store } from "../store/store";
import emojisIcons from "./smiles.json";

const EmojisIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

const SendIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="50px"
      width="50px"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDate = (date) => {
  // 1 January 2022 12:10
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()} ${
    date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
};

export const Chat = observer(() => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [smilesView, setSmilesView] = useState(false);

  const toggleSmilesView = (e) => {
    e.preventDefault();
    setSmilesView(!smilesView);
    console.log(smilesView);
  };

  const addIconToMessage = (icon) => {
    store.chat.addSmile(icon);
  };

  const submmitHandler = (e) => {
    e.preventDefault();
    setSmilesView(false);
    store.chat.clearMessage()
    // console.log(e);

    const newMessages = [
      ...store.chat.messages,
      {
        time: formatDate(new Date()),
        author: store.auth.user,
        text: e.target.elements.message.value,
      },
    ];

    store.chat.setMessages(newMessages);

    if (!message) return;
    console.log("send message");
  };

  const [message, setMessage] = useState("");

  const changeHandler = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    document
      .querySelectorAll(".message")
      [document.querySelectorAll(".message").length - 1].scrollIntoView(
        firstLoad
          ? {
              block: "end",
              inline: "nearest",
            }
          : {
              behavior: "smooth",
              block: "end",
              inline: "nearest",
            }
      );
    setFirstLoad(false);
  }, [store.chat.messages]);

  return (
    <div className="chat">
      <div className="header">
        <Title> ЧАТ </Title>
      </div>

      <ul className="chat__messages">
        {store.chat.messages.map((message) => (
          <ChatMessage
            key={nanoid()}
            time={message.time}
            author={message.author}
            text={message.text}
          />
        ))}
      </ul>

      {smilesView ? (
        <div className="smiles-board">
          <div className="smiles-board-list">
            {emojisIcons.map((icon) => (
              <Button fn={() => addIconToMessage(icon)}>
                <span>{icon}</span>
              </Button>
            ))}
          </div>
        </div>
      ) : (
        false
      )}

      <form className="chat-form" onSubmit={submmitHandler}>
        <Input
          id="message"
          placeholder="Ваше сообщение..."
          fn={store.chat.typeMessage}
          text={store.chat.message}
        />
        <Button fn={(e) => toggleSmilesView(e)}>
          <EmojisIcon />
        </Button>
        <Button>
          <SendIcon />
        </Button>
      </form>
    </div>
  );
});
