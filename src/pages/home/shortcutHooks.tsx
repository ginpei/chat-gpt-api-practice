import { useEffect } from "react";

export interface KeyCombination {
  alt: boolean;
  code: string;
  ctrl: boolean;
  shift: boolean;
}

export function useOnKey(
  key: string,
  el: HTMLElement | null,
  callback: () => void
): void {
  useEffect(() => {
    const combination = parseKeyCombination(key);

    const onKeyPress = (event: KeyboardEvent) => {
      if (!el || !document.activeElement) {
        return;
      }

      if (
        event.ctrlKey !== combination.ctrl ||
        event.altKey !== combination.alt ||
        event.shiftKey !== combination.shift ||
        event.code !== combination.code
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

    document.addEventListener("keydown", onKeyPress);
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [callback, el, key]);
}

function parseKeyCombination(input: string): KeyCombination {
  const rxKeyCombination = /^(Ctrl\+)?(Alt\+)?(Shift\+)?(\w+)$/;
  const matched = input.match(rxKeyCombination);
  if (!matched) {
    throw new Error(`Wrong key combination`);
  }
  const ctrl = Boolean(matched[1]);
  const alt = Boolean(matched[2]);
  const shift = Boolean(matched[3]);
  const code = matched[4];

  return {
    alt,
    code,
    ctrl,
    shift,
  };
}
