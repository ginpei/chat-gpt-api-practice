import { MouseEventHandler } from "react";
import { NiceButton } from "../../../domains/button/NiceButton";
import { Note } from "../../../domains/note/Note";
import { PopupMenuItem } from "../../../domains/popupMenu/PopupMenuItem";

export interface FileItemProps {
  note: Note;
  onClick: () => void;
  onRemove: (note: Note) => void;
}

export function FileItem({
  note,
  onClick,
  onRemove,
}: FileItemProps): JSX.Element {
  // TODO
  if (note.type !== "chat") {
    throw new Error(`WIP`);
  }

  const title = note.title || note.body.messages[0]?.body || "(New note)";

  return (
    <div className="flex">
      <span className="grid flex-grow">
        <PopupMenuItem key={note.id} onClick={onClick}>
          {title}
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
