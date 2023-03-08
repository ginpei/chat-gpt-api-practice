import { useEffect, useRef } from "react";
import { useDialogOpen } from "../dialogHooks";

export interface NiceDialogProps<T = void> extends NiceDialogCoreProps<T> {
  children: React.ReactNode;
  title?: string;
}

export interface NiceDialogCoreProps<T = void> {
  onClose: (result: T) => void;
  open: boolean;
}

export function NiceDialog({
  children,
  onClose,
  open,
  title,
}: NiceDialogProps): JSX.Element {
  const refDialog = useRef<HTMLDialogElement>(null);
  useDialogOpen(refDialog.current, open);
  const elDialog = refDialog.current;

  useEffect(() => {
    if (!elDialog) {
      return;
    }

    const onDialogClose = () => onClose(undefined);

    elDialog.addEventListener("close", onDialogClose);
    elDialog.addEventListener("cancel", onDialogClose);
    return () => {
      elDialog.removeEventListener("close", onDialogClose);
      elDialog.removeEventListener("cancel", onDialogClose);
    };
  }, [elDialog, onClose]);

  return (
    <dialog
      className="
      NiceDialog
      border-2 border-ginpei shadow-lg min-w-[10em] p-0
      "
      ref={refDialog}
    >
      <div className="flex justify-between px-2 py-1 bg-ginpei text-white">
        <div className="font-bold">{title}</div>
        <button
          className="hover:bg-gray-600"
          onClick={() => onClose(undefined)}
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor"></path>
          </svg>
        </button>
      </div>
      {children}
    </dialog>
  );
}
