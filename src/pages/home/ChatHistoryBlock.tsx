import { useChatHistoryContext } from "../../domains/chat/ChatHistoryContext";
import { ChatItem } from "./ChatItem";

export interface ChatHistoryBlockProps {}

export function ChatHistoryBlock({}: ChatHistoryBlockProps): JSX.Element {
  const [history] = useChatHistoryContext();

  return (
    <div className="ChatHistoryBlock flex-grow overflow-auto bg-stone-50">
      {history.messages.map((message) => (
        <ChatItem key={message.id} message={message} />
      ))}
      <div className="px-4 py-2 text-end text-sm text-gray-300">
        Total token usage: {history.tokenUsage}
      </div>
      <div aria-hidden className="min-h-[5em]"></div>
    </div>
  );
}
