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

const bodyThemeMap = {
  "": "",
  ai: "text-sky-700",
  you: "text-gray-700",
} as const;

const wrapperThemeMap = {
  "": "",
  ai: "bg-sky-50 border-b-sky-100",
  you: "bg-white border-b-gray-100",
} as const;

export function ChatItem({ message }: ChatItemProps): JSX.Element {
  return (
    <div
      className={`ChatItem border-b px-4 py-2 ${wrapperThemeMap[message.name]}`}
    >
      <HStack>
        <span className="w-8 mr-2 whitespace-nowrap">
          {iconMap[message.name]}
        </span>
        <span className={`whitespace-pre-wrap ${bodyThemeMap[message.name]}`}>
          {message.body}
        </span>
      </HStack>
    </div>
  );
}
