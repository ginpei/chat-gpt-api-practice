import { ChatMessage } from "../../domains/chat/ChatMessage";

export interface ChatItemProps {
  message: ChatMessage;
}

export function ChatItem({ message }: ChatItemProps): JSX.Element {
  return (
    <div className="ChatItem">
      {message.name}: {message.body}
    </div>
  );
}
