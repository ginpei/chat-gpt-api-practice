import React from "react";

export function isOutside(
  elDialog: HTMLDialogElement,
  event: MouseEvent | React.MouseEvent
): boolean {
  if (event.target !== elDialog) {
    return false;
  }

  const rect = elDialog.getBoundingClientRect();
  const { clientX: clickX, clientY: clickY } = event;

  const outside =
    clickX < rect.left ||
    rect.right < clickX ||
    clickY < rect.top ||
    rect.bottom < clickY;

  return outside;
}
