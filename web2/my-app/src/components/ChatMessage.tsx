import { onMount } from "solid-js";
import { IMessage } from "../utils/types";

type ChatMessageProps = {
  created: string;
  user: string;
  text: string;
  ref: any;
};

export const ChatMessage = (props: ChatMessageProps) => {

  return (
    <li class="message" ref={props.ref}>
      <div class="message__meta">
        <span class="message__text message__text--time">{created}</span>
        <span class="message__text message__text--author">{user}</span>
      </div>

      <p class="message__content">{text}</p>
    </li>
  );
};
