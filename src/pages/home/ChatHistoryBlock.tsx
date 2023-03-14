import { NiceButton } from "../../domains/button/NiceButton";
import {
  createChatHistoryContextValue,
  useChatHistoryContext,
} from "../../domains/chat/ChatHistoryContext";
import { saveHistoryLog } from "../../domains/chat/chatLogStore";
import { ClearChatHistoryButton } from "./ClearChatHistoryButton";
import { ChatItem } from "./ChatItem";
import { Container } from "../../domains/layout/Container";

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
      <Container>
        <div className="py-2 text-end text-sm text-gray-300">
          Chat token usage: {history.completionTokenUsage}
        </div>
      </Container>
      <div aria-hidden className="min-h-[5em]"></div>
      {history.messages.length > 1 && (
        <Container>
          <div className="grid">
            <ClearChatHistoryButton onProceed={onClearHistory} />
          </div>
        </Container>
      )}
      <div aria-hidden className="min-h-[5em]"></div>
    </div>
  );
}
