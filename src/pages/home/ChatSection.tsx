import { useChatHistoryContext } from "../../domains/chat/ChatHistoryContext";
import { ChatControlBlock } from "./ChatControlBlock";
import { ChatItem } from "./ChatItem";

export interface ChatSectionProps {}

export function ChatSection(): JSX.Element {
  const [history] = useChatHistoryContext();

  return (
    <div className="ChatSection flex flex-col-reverse content-between">
      <ChatControlBlock />
      <div className="flex-grow overflow-auto bg-stone-50">
        {history.messages.map((message) => (
          <ChatItem key={message.id} message={message} />
        ))}
        <div aria-hidden className="min-h-[5em]"></div>
      </div>
    </div>
  );
}
