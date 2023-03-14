import { ChatControlBlock } from "./control/ChatControlBlock";
import { ChatHistoryBlock } from "./history/ChatHistoryBlock";
import { useClearChatHistoryAction } from "./chatHistoryManipulators";
import { useOnKey } from "./shortcutHooks";

export interface ChatSectionProps {}

export function ChatSection(): JSX.Element {
  const clearChatHistory = useClearChatHistoryAction();
  useOnKey("Ctrl+L", document.body, () => {
    clearChatHistory();
  });

  return (
    <div className="ChatSection flex flex-col-reverse content-between">
      <ChatControlBlock />
      <ChatHistoryBlock />
    </div>
  );
}
