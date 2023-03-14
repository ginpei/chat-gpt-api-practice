import { RefObject } from "react";
import { useOnKey } from "../key/keyHooks";

export function useFocusTrap(ref: RefObject<HTMLElement>): void {
  useOnKey("Tab", ref.current, () => {
    if (!ref.current) {
      return;
    }
    focusNext(ref.current, 1);
  });

  useOnKey("Shift+Tab", ref.current, () => {
    if (!ref.current) {
      return;
    }
    focusNext(ref.current, -1);
  });
}

function focusNext(el: HTMLElement, direction: 1 | -1): void {
  const elFocusables = getAllFocusable(el);
  if (elFocusables.length < 1) {
    return;
  }

  const elActive = el.ownerDocument.activeElement;
  if (!elActive || !(elActive instanceof HTMLElement)) {
    elFocusables[0].focus();
    return;
  }

  const curIndex = elFocusables.indexOf(elActive);
  const elNext =
    elFocusables[curIndex + direction] ??
    elFocusables.at(direction > 0 ? 0 : -1);

  elNext.focus();
}

function getAllFocusable(el: HTMLElement): HTMLElement[] {
  const els = Array.from(
    el.querySelectorAll(
      ":is(a, audio, button, input, select, textarea, video, [contenteditable], [tabindex]):not(:disabled, [tabindex='0'])"
    )
  ).filter((v): v is HTMLElement => v instanceof HTMLElement);
  return els;
}
