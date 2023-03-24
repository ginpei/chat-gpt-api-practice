import { useOnKey } from "../../domains/key/keyHooks";
import { useCurNote } from "../../domains/userAssets/UserAssetsContextHooks";
import { useClearChatHistoryAction } from "./chatHistoryManipulators";
import { ChatControlBlock } from "./control/ChatControlBlock";
import { ChatHistoryBlock } from "./history/ChatHistoryBlock";

export interface ChatSectionProps {}

export function ChatSection(): JSX.Element {
  const note = useCurNote();

  const clearChatHistory = useClearChatHistoryAction();
  useOnKey("Ctrl+L", document.body, () => {
    clearChatHistory();
  });

  return (
    <div className="ChatSection flex flex-col-reverse content-between">
      {note.type === "chat" && (
        <>
          <ChatControlBlock note={note} />
          <ChatHistoryBlock note={note} />
        </>
      )}
    </div>
  );
}
