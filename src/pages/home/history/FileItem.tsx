import { Note } from "../../../domains/note/Note";
import { ChatNoteFileItem } from "./ChatNoteFileItem";

export interface FileItemProps<T extends Note = Note> {
  note: T;
  onClick: () => void;
  onRemove: (note: Note) => void;
}

export function FileItem({ note, ...props }: FileItemProps): JSX.Element {
  if (note.type === "chat") {
    return <ChatNoteFileItem note={note} {...props} />;
  }

  throw new Error(`Unknown note type "${note.type}"`);
}
