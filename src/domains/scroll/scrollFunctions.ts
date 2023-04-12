export function scrollToElement(elTarget: Element): void {
  const elFrame = findScrollElement(elTarget);
  if (!elFrame) {
    return;
  }

  elTarget.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}

function findScrollElement(el: Element): Element | null {
  const elParent = el.parentElement;
  if (!elParent) {
    return null;
  }

  if (elParent.scrollHeight > elParent.clientHeight) {
    return elParent;
  }

  return findScrollElement(elParent);
}
