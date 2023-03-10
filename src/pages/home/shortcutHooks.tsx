import { KeyboardEventHandler, useEffect } from "react";

export function useOnCtrlEnter(
  el: HTMLElement | null,
  callback: () => void
): void {
  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) => {
      if (!el || !document.activeElement) {
        return;
      }

      if (
        !event.ctrlKey ||
        event.altKey ||
        event.shiftKey ||
        event.code !== "Enter"
      ) {
        return;
      }

      const pos = document.activeElement.compareDocumentPosition(el);
      if (pos !== 0 && !(pos & Node.DOCUMENT_POSITION_CONTAINS)) {
        return;
      }

      event.preventDefault();
      callback();
    };

    document.addEventListener("keypress", onKeyPress);
    return () => document.removeEventListener("keypress", onKeyPress);
  }, [callback, el]);
}
