import { Note } from "../../../domains/note/Note";
import {
  PopupMenu,
  PopupMenuCloseHandler,
  PopupMenuCoreProps,
} from "../../../domains/popupMenu/PopupMenu";
import { PopupMenuHeading } from "../../../domains/popupMenu/PopupMenuHeading";
import { PopupMenuItem } from "../../../domains/popupMenu/PopupMenuItem";
import { FileItem } from "./FileItem";

export interface SelectFilePopupProps extends PopupMenuCoreProps<Note> {
  notes: Note[];
  onNoteRemove: (note: Note) => void;
}

export type SelectFileCloseHandler = PopupMenuCloseHandler<Note>;

export function SelectFilePopup({
  notes,
  onClose,
  onNoteRemove,
  open,
}: SelectFilePopupProps): JSX.Element {
  return (
    <PopupMenu onClose={onClose} open={open}>
      <form className="w-[80vw] flex flex-col" method="dialog">
        <PopupMenuHeading>Open</PopupMenuHeading>
        <div className="max-h-[50vh] overflow-y-auto flex flex-col">
          {notes.map((note) => (
            <FileItem
              key={note.id}
              note={note}
              onClick={() => onClose(note)}
              onRemove={onNoteRemove}
            />
          ))}
          {notes.length < 1 && <div>TODO no notes</div>}
        </div>
        <PopupMenuItem onClick={() => onClose(undefined)}>
          <small>Cancel</small>
        </PopupMenuItem>
      </form>
    </PopupMenu>
  );
}
