import { useCurNote } from "../../domains/userAssets/UserAssetsContextHooks";
import { ChatNoteSection } from "./chat/ChatNoteSection";
import { ImageNoteSection } from "./image/ImageNoteSection";

export interface ChatSectionProps {}

export function ChatSection(): JSX.Element {
  const note = useCurNote();
  const { type } = note;

  if (type === "chat") {
    return <ChatNoteSection note={note} />;
  }

  if (type === "image") {
    return <ImageNoteSection note={note} />;
  }

  throw new Error(`Unknown note type: "${type}"`);
}
