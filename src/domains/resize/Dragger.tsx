import { PointerEventHandler, ReactNode, useRef, useState } from "react";

export interface DraggerProps {
  children: ReactNode;
  onDone?: DragPositionHandler | undefined;
  onMove?: DragPositionHandler | undefined;
}

export interface DragPosition {
  dx: number;
  dy: number;
  x: number;
  x0: number;
  y: number;
  y0: number;
}

export type DragPositionHandler = (position: DragPosition) => void;

export function Dragger({
  children,
  onDone,
  onMove,
}: DraggerProps): JSX.Element {
  const refHandle = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [x0, setX0] = useState(NaN);
  const [y0, setY0] = useState(NaN);

  const onPointerDown: PointerEventHandler = (event) => {
    const el = refHandle.current;
    if (dragging) {
      return;
    }

    event.preventDefault();
    el?.setPointerCapture(event.pointerId);

    const x = event.pageX;
    const x0 = event.pageX;
    const y = event.pageY;
    const y0 = event.pageY;

    setDragging(true);
    setX0(x0);
    setY0(y0);

    onMove?.({ dx: 0, dy: 0, x, x0, y, y0 });
  };

  const onPointerMove: PointerEventHandler = (event) => {
    if (!dragging) {
      return;
    }

    const x = event.pageX;
    const dx = x - x0;
    const y = event.pageY;
    const dy = y - y0;
    onMove?.({ dx, dy, x, x0, y, y0 });
  };

  const onPointerUp: PointerEventHandler = (event) => {
    refHandle.current?.releasePointerCapture(event.pointerId);
    setDragging(false);

    const x = event.pageX;
    const dx = x - x0;
    const y = event.pageY;
    const dy = y - y0;
    onDone?.({ dx, dy, x, x0, y, y0 });
  };

  const onPointerCancel: PointerEventHandler = (event) => {
    refHandle.current?.releasePointerCapture(event.pointerId);
    setDragging(false);

    const x = x0;
    const dx = 0;
    const y = y0;
    const dy = 0;
    onDone?.({ dx, dy, x, x0, y, y0 });
  };

  return (
    <div
      className="Dragger"
      onPointerCancel={onPointerCancel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      ref={refHandle}
    >
      {children}
    </div>
  );
}
