import { MouseEventHandler } from "react";
import { ChatNote, noteIcons } from "../../../domains/note/Note";
import { PopupMenuItem } from "../../../domains/popupMenu/PopupMenuItem";
import { FileItemProps } from "./FileItem";

export type ChatNoteFileItemProps = FileItemProps<ChatNote>;

export function ChatNoteFileItem({
  note,
  onClick,
  onRemove,
}: ChatNoteFileItemProps): JSX.Element {
  const title = note.title || note.body.messages[0]?.body || "(New note)";

  return (
    <div className="ChatNoteFileItem flex">
      <span className="grid flex-grow">
        <PopupMenuItem key={note.id} onClick={onClick}>
          {noteIcons["chat"]} {title}
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
