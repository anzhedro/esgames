import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { observer } from "mobx-react-lite";

import { ChatMessage } from "../components/ChatMessage";
import { Button } from "../components/Button";
import { Input } from "../components/input";
import { Title } from "../components/Title";
import { store } from "../store/store";

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

export const ChatPage = observer(() => {

  const submmitHandler = (e) => {
    e.preventDefault();
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
      [document.querySelectorAll(".message").length - 1].scrollIntoView({
        behavior: "auto",
        block: "end",
        inline: "nearest",
      });

  }, [store.chat.messages]);

  return (
    <div className="layout">
      <div className="game__container"> </div>
      <div className="chat__container">
        <Title> CHAT </Title>

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

        <form className="chat-form" onSubmit={submmitHandler}>
          <Input
            id="message"
            placeholder="Type a message..."
            fn={changeHandler}
            text={message}
          />
          <Button>Send</Button>
        </form>
      </div>
    </div>
  );
});
