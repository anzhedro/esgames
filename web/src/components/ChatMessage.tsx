import React, { forwardRef } from "react";

interface RefType {
  readonly current: HTMLLIElement
}

interface IMessage {
  time: string;
  author: string;
  text: string;
}

export const ChatMessage = forwardRef(({ time, author, text } : IMessage , ref:React.Ref<HTMLLIElement>) => {
  return (
    <li className="message" ref={ref}>
      <div className="message__meta">
        <span className="message__text message__text--time">{time}</span>
        <span className="message__text message__text--author">{author}</span>
      </div>

      <p className="message__content">{text}</p>
    </li>
  );
});
