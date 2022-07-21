import React, { forwardRef } from "react";
import { IMessage } from "../utils/types";


export const ChatMessage = forwardRef(({ created, user, text }: IMessage, ref: React.Ref<HTMLLIElement>) => {
  return (
    <li className="message" ref={ref}>
      <div className="message__meta">
        <span className="message__text message__text--time">{created}</span>
        <span className="message__text message__text--author">{user}</span>
      </div>

      <p className="message__content">{text}</p>
    </li>
  );
});
