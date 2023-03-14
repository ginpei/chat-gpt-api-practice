import { RefObject, useEffect } from "react";

export function useDialogOpen(
  refDialog: RefObject<HTMLDialogElement>,
  open: boolean
): void {
  useEffect(() => {
    const el = refDialog.current;
    if (!el) {
      return;
    }

    if (open && !el.open) {
      el.showModal();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open, refDialog]);
}
