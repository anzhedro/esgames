export type ChatMessageProps = {
  created: string;
  user: string;
  text: string;
  ref: any;
};

export const ChatMessage = (props: ChatMessageProps) => (
    <li class="message" ref={props.ref}>
      <div class="message__meta">
        <span class="message__text message__text--time">{props.created}</span>
        <span class="message__text message__text--author">{props.user}</span>
      </div>
      <p class="message__content">{props.text}</p>
    </li>
);
