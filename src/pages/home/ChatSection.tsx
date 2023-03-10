import { ChatControlBlock } from "./ChatControlBlock";
import { ChatHistoryBlock } from "./ChatHistoryBlock";

export interface ChatSectionProps {}

export function ChatSection(): JSX.Element {
  return (
    <div className="ChatSection flex flex-col-reverse content-between">
      <ChatControlBlock />
      <ChatHistoryBlock />
    </div>
  );
}
