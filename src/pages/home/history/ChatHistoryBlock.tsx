import { NiceButton } from "../../../domains/button/NiceButton";
import { useChatHistoryContext } from "../../../domains/chat/ChatHistoryContext";
import { Container } from "../../../domains/layout/Container";
import { ChatItem } from "./ChatItem";
import { useClearChatHistoryAction } from "../chatHistoryManipulators";
import { KeyAssign } from "../../../domains/key/KeyAssign";

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
            <NiceButton onClick={clearHistoryClick} type="button">
              🗑️ Clear history... <KeyAssign>(Ctrl+L)</KeyAssign>
            </NiceButton>
          </div>
        </Container>
      )}
      <div aria-hidden className="min-h-[5em]"></div>
    </div>
  );
}
