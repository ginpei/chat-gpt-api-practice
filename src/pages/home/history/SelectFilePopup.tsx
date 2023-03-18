import {
  PopupMenu,
  PopupMenuCloseHandler,
  PopupMenuCoreProps,
} from "../../../domains/popupMenu/PopupMenu";
import { PopupMenuHeading } from "../../../domains/popupMenu/PopupMenuHeading";
import { PopupMenuItem } from "../../../domains/popupMenu/PopupMenuItem";
import { Note, NoteBase } from "./Note";

export interface SelectFilePopupProps extends PopupMenuCoreProps<Note> {
  notes: Note[];
}

export type SelectFileCloseHandler = PopupMenuCloseHandler<Note>;

export function SelectFilePopup({
  onClose,
  open,
  notes,
}: SelectFilePopupProps): JSX.Element {
  return (
    <PopupMenu onClose={onClose} open={open}>
      <form className="w-[80vw] flex flex-col" method="dialog">
        <PopupMenuHeading>Open</PopupMenuHeading>
        <div className="max-h-[50vh] overflow-y-auto flex flex-col">
          {notes.map((note) => (
            <PopupMenuItem key={note.id} onClick={() => onClose(note)}>
              {note.title}
            </PopupMenuItem>
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
