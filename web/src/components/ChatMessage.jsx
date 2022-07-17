import React, { forwardRef } from "react";

export const ChatMessage = forwardRef(
  (
    {
      avatar = "https://avatars0.githubusercontent.com/u/17098477?s=460&v=4",
      time,
      author,
      text,
    },
    ref
  ) => {
    return (
      <li className="message" ref={ref}>
        <div className="message__meta">
          <span className="message__text message__text--time">{time}</span>
          <span className="message__text message__text--author">{author}</span>
        </div>

        <p className="message__content">{text}</p>
      </li>
    );
  }
);
