import { ChatMessage } from "../../domains/chat/ChatMessage";
import { HStack } from "../../domains/layout/HStack";

export interface ChatItemProps {
  message: ChatMessage;
}

const nameMap = {
  "": "?",
  ai: "💻💭",
  you: "👤",
} as const;

export function ChatItem({ message }: ChatItemProps): JSX.Element {
  return (
    <div className="ChatItem">
      <HStack>
        <div>{nameMap[message.name]}</div>
        <div className="whitespace-pre-wrap">
          {message.body}{" "}
          <small>({new Date(message.date).toLocaleString()})</small>
        </div>
      </HStack>
    </div>
  );
}
