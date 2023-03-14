import {
  PopupMenu,
  PopupMenuCloseHandler,
  PopupMenuCoreProps,
} from "../../../domains/popupMenu/PopupMenu";
import { PopupMenuItem } from "../../../domains/popupMenu/PopupMenuItem";

export type SendOptionPopupProps = PopupMenuCoreProps<Result>;

export type SendOptionCloseHandler = PopupMenuCloseHandler<Result>;

type Result = "text" | "system" | "image";

export function SendOptionPopup({
  onClose,
  open,
}: SendOptionPopupProps): JSX.Element {
  return (
    <PopupMenu onClose={onClose} open={open}>
      <PopupMenuItem onClick={() => onClose("text")}>
        📝 Send text chat
      </PopupMenuItem>
      <PopupMenuItem disabled onClick={() => onClose("system")}>
        🖥️ Send system description
      </PopupMenuItem>
      <PopupMenuItem onClick={() => onClose("image")}>
        🖼️ Request image
      </PopupMenuItem>
      <PopupMenuItem onClick={() => onClose(undefined)}>
        <small>Cancel</small>
      </PopupMenuItem>
    </PopupMenu>
  );
}
