import { NiceButton } from "../../domains/button/NiceButton";
import {
  createChatHistoryContextValue,
  useChatHistoryContext,
} from "../../domains/chat/ChatHistoryContext";
import { saveHistoryLog } from "../../domains/chat/chatLogStore";
import { ClearChatHistoryButton } from "./ClearChatHistoryButton";
import { ChatItem } from "./ChatItem";

export interface ChatHistoryBlockProps {}

export function ChatHistoryBlock({}: ChatHistoryBlockProps): JSX.Element {
  const [history, setHistory] = useChatHistoryContext();

  const onClearHistory = () => {
    saveHistoryLog(createChatHistoryContextValue());
    setHistory(createChatHistoryContextValue());
  };

  return (
    <div className="ChatHistoryBlock flex-grow overflow-auto bg-stone-50">
      {history.messages.map((message) => (
        <ChatItem key={message.id} message={message} />
      ))}
      <div className="px-4 py-2 text-end text-sm text-gray-300">
        Chat token usage: {history.completionTokenUsage}
      </div>
      <div aria-hidden className="min-h-[5em]"></div>
      {history.messages.length > 1 && (
        <div className="grid p-4">
          <ClearChatHistoryButton onProceed={onClearHistory} />
        </div>
      )}
      <div aria-hidden className="min-h-[5em]"></div>
    </div>
  );
}
