import NiceMarkdown from "@ginpei/react-nice-markdown";
import { ChatMessage } from "../../../domains/chat/ChatMessage";
import { Container } from "../../../domains/layout/Container";
import { HStack } from "../../../domains/layout/HStack";

export interface ChatItemProps {
  message: ChatMessage;
  renderMarkdown: boolean;
}

const authorIconMap = {
  "": "?",
  ai: "💻",
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

export function ChatItem({
  message,
  renderMarkdown,
}: ChatItemProps): JSX.Element {
  return (
    <div className={`ChatItem border-b py-2 ${wrapperThemeMap[message.name]}`}>
      <Container>
        <HStack>
          <div className="w-8 mr-2 whitespace-nowrap">
            {authorIconMap[message.name]}
            {message.name === "you" && "💭"}
          </div>
          <div className={`flex-grow ${bodyThemeMap[message.name]}`}>
            {renderMarkdown ? (
              <NiceMarkdown content={message.body} />
            ) : (
              <div className="whitespace-pre-wrap">{message.body}</div>
            )}
          </div>
        </HStack>
      </Container>
    </div>
  );
}
