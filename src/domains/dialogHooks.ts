import { useEffect } from "react";

export function useDialogOpen(
  el: HTMLDialogElement | null,
  open: boolean
): void {
  useEffect(() => {
    if (!el) {
      return;
    }

    if (open) {
      if (!el.open) {
        el.showModal();
      }
    } else {
      el.close();
    }
  }, [el, open]);
}
