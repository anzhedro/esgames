import React from "react";

export const ChatMessage = ({
  avatar = "https://avatars0.githubusercontent.com/u/17098477?s=460&v=4",
  time,
  author,
  text,
}) => {
  return (
    <li className="message">
      <div className="message__meta">
        {/* <div className="message__avatar">
          <img src={avatar} alt="avatar" />
        </div> */}
        <span className="message__text message__text--time">{time}</span>
        <span className="message__text message__text--author">{author}</span>
      </div>

      <p className="message__content">{text}</p>
    </li>
  );
};
