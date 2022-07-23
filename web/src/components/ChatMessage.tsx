import { onMount } from "solid-js";
import { ChatMessageProps, IMessage } from "../utils/types";

export const ChatMessage = (props: ChatMessageProps) => {
  return (
    <li class="message" ref={props.ref}>
      <div class="message__meta">
        <span class="message__text message__text--time">{props.created}</span>
        <span class="message__text message__text--author">{props.user}</span>
      </div>
      <p class="message__content">{props.text}</p>
    </li>
  );
};
