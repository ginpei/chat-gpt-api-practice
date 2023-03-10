import { ChatMessage } from "../../domains/chat/ChatMessage";
import { HStack } from "../../domains/layout/HStack";

export interface ChatItemProps {
  message: ChatMessage;
}

const iconMap = {
  "": "?",
  ai: "💻💭",
  you: "👤",
} as const;

const textColorMap = {
  "": "",
  ai: "text-sky-700",
  you: "text-gray-700",
} as const;

const bgColorMap = {
  "": "",
  ai: "bg-sky-50",
  you: "bg-white",
} as const;

export function ChatItem({ message }: ChatItemProps): JSX.Element {
  return (
    <div className={`ChatItem px-4 py-2 ${bgColorMap[message.name]}`}>
      <HStack>
        <span className="w-8 mr-2 whitespace-nowrap">
          {iconMap[message.name]}
        </span>
        <span className={`whitespace-pre-wrap ${textColorMap[message.name]}`}>
          {message.body}
        </span>
      </HStack>
    </div>
  );
}
