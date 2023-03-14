import { useChatHistoryContext } from "../../../domains/chat/ChatHistoryContext";
import { KeyAssign } from "../../../domains/key/KeyAssign";
import { Container } from "../../../domains/layout/Container";
import { useClearChatHistoryAction } from "../chatHistoryManipulators";
import { ChatItem } from "./ChatItem";
import { DiscreetButton } from "./DiscreetButton";

export interface ChatHistoryBlockProps {}

export function ChatHistoryBlock({}: ChatHistoryBlockProps): JSX.Element {
  const [history] = useChatHistoryContext();
  const clearHistoryClick = useClearChatHistoryAction();

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
            <DiscreetButton onClick={clearHistoryClick} type="button">
              🗑️ Clear history... <KeyAssign>(Ctrl+L)</KeyAssign>
            </DiscreetButton>
          </div>
        </Container>
      )}
      <div aria-hidden className="min-h-[5em]"></div>
    </div>
  );
}
