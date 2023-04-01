import { MouseEventHandler } from "react";
import { Note, noteIcons } from "../../../domains/note/Note";
import { PopupMenuItem } from "../../../domains/popupMenu/PopupMenuItem";

export interface FileItemProps<T extends Note = Note> {
  note: T;
  onClick: () => void;
  onRemove: (note: Note) => void;
}

export function FileItem({
  note,
  onClick,
  onRemove,
}: FileItemProps): JSX.Element {
  const title =
    note.title ||
    (note.type === "chat"
      ? note.body.messages[0]?.body
      : note.body.images[0]?.prompt) ||
    "(New note)";

  return (
    <div className="FileItem flex">
      <span className="grid flex-grow">
        <PopupMenuItem key={note.id} onClick={onClick}>
          {noteIcons[note.type]} {title}
        </PopupMenuItem>
      </span>
      <RemoveButton onClick={() => onRemove(note)} />
    </div>
  );
}

function RemoveButton(props: { onClick: MouseEventHandler }): JSX.Element {
  return (
    <button
      className="
      border border-transparent p-4
      hover:border-gray-200
      active:border-gray-200
      "
      onClick={props.onClick}
      type="button"
    >
      🗑️
    </button>
  );
}
