import { useCurNote } from "../../domains/userAssets/UserAssetsContextHooks";
import { ChatControlBlock } from "./control/ChatControlBlock";
import { ChatHistoryBlock } from "./history/ChatHistoryBlock";
import { ImageNoteSection } from "./image/ImageNoteSection";

export interface ChatSectionProps {}

export function ChatSection(): JSX.Element {
  const note = useCurNote();
  const { type } = note;

  if (type === "chat") {
    return (
      <div className="ChatSection flex flex-col-reverse content-between">
        <ChatControlBlock note={note} />
        <ChatHistoryBlock note={note} />
      </div>
    );
  }

  if (type === "image") {
    return <ImageNoteSection note={note} />;
  }

  throw new Error(`Unknown note type: "${type}"`);
}
