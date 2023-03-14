import { useEffect, useRef } from "react";
import { useFocusTrap } from "../focus/focusHooks";

export interface PopupMenuProps<Result> extends PopupMenuCoreProps<Result> {
  children: React.ReactNode;
}

export interface PopupMenuCoreProps<Result> {
  onClose: PopupMenuCloseHandler<Result>;
  open: boolean;
}

export type PopupMenuCloseHandler<Result> = (type: Result | undefined) => void;

export function PopupMenu<Result>({
  onClose,
  open,
  children,
}: PopupMenuProps<Result>): JSX.Element {
  const refDialog = useRef<HTMLDialogElement>(null);

  useFocusTrap(refDialog);

  useEffect(() => {
    const elDialog = refDialog.current;
    if (!elDialog) {
      return;
    }

    if (open && !elDialog.open) {
      elDialog.showModal();
    } else if (!open && elDialog.open) {
      elDialog.close();
    }
  }, [open]);

  const onDialogClose = () => {
    onClose(undefined);
  };

  return (
    <dialog className="PopupMenu p-0" onClose={onDialogClose} ref={refDialog}>
      <div className="flex flex-col">{children}</div>
    </dialog>
  );
}
