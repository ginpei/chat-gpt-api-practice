import { useOnKey } from "../../domains/key/keyHooks";
import { useCurNote } from "../../domains/userAssets/UserAssetsContextHooks";
import { useClearChatHistoryAction } from "./chatHistoryManipulators";
import { ChatControlBlock } from "./control/ChatControlBlock";
import { ChatHistoryBlock } from "./history/ChatHistoryBlock";

export interface ChatSectionProps {}

export function ChatSection(): JSX.Element {
  const note = useCurNote();
  const { type } = note;

  const clearChatHistory = useClearChatHistoryAction();
  useOnKey("Ctrl+L", document.body, () => {
    clearChatHistory();
  });

  if (type === "chat") {
    return (
      <div className="ChatSection flex flex-col-reverse content-between">
        <ChatControlBlock note={note} />
        <ChatHistoryBlock note={note} />
      </div>
    );
  }

  if (type === "image") {
    return <div className="ChatSection">IMAGE</div>;
  }

  throw new Error(`Unknown note type: "${type}"`);
}
