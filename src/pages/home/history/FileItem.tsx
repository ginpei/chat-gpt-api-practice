import { Note } from "../../../domains/note/Note";
import { PopupMenuItem } from "../../../domains/popupMenu/PopupMenuItem";

export interface FileItemProps {
  note: Note;
  onClick: () => void;
}

export function FileItem({ note, onClick }: FileItemProps): JSX.Element {
  // TODO
  if (note.type !== "chat") {
    throw new Error(`WIP`);
  }

  const title = note.title || note.body.messages[0]?.body || "(New note)";

  return (
    <PopupMenuItem key={note.id} onClick={onClick}>
      {title}
    </PopupMenuItem>
  );
}
