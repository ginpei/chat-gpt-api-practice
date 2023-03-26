import { noteIcons, NoteType } from "../../../domains/note/Note";
import {
  PopupMenu,
  PopupMenuCloseHandler,
  PopupMenuCoreProps,
} from "../../../domains/popupMenu/PopupMenu";
import { PopupMenuHeading } from "../../../domains/popupMenu/PopupMenuHeading";
import { PopupMenuItem } from "../../../domains/popupMenu/PopupMenuItem";

export interface NewFilePopupProps extends PopupMenuCoreProps<NoteType> {}

export type NewFilePopupCloseHandler = PopupMenuCloseHandler<NoteType>;

export function NewFilePopup({
  onClose,
  open,
}: NewFilePopupProps): JSX.Element {
  return (
    <PopupMenu onClose={onClose} open={open}>
      <form className="w-[80vw] flex flex-col" method="dialog">
        <PopupMenuHeading>New note</PopupMenuHeading>
        <PopupMenuItem onClick={() => onClose("chat")}>
          {noteIcons["chat"]} Chat
        </PopupMenuItem>
        <PopupMenuItem onClick={() => onClose("image")}>
          {noteIcons["image"]} Image
        </PopupMenuItem>
        <PopupMenuItem onClick={() => onClose(undefined)}>
          <small>Cancel</small>
        </PopupMenuItem>
      </form>
    </PopupMenu>
  );
}
