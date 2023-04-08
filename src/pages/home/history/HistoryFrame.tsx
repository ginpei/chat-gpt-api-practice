import { useState } from "react";
import { DragPositionHandler } from "../../../domains/resize/Dragger";
import { VResizeBar } from "../../../domains/resize/VResizeBar";

export interface HistoryFrameProps {
  ControlBlock: React.ReactNode;
  HistoryBlock: React.ReactNode;
}

export function HistoryFrame({
  ControlBlock,
  HistoryBlock,
}: HistoryFrameProps): JSX.Element {
  const [textBoxHeightPx, setTextBoxHeightPx] = useState(200);
  const [textBoxHeightTransitionPx, setTextBoxHeightTransitionPx] = useState(0);

  const controlHeight = textBoxHeightPx + textBoxHeightTransitionPx;

  const onResizeBarDone: DragPositionHandler = () => {
    setTextBoxHeightPx(textBoxHeightPx + textBoxHeightTransitionPx);
    setTextBoxHeightTransitionPx(0);
  };

  const onResizeBarMove: DragPositionHandler = (pos) => {
    const minHeight = 200;
    const dy = -pos.dy;
    const px = Math.max(minHeight - textBoxHeightPx, dy);
    setTextBoxHeightTransitionPx(px);
  };

  return (
    <div className="HistoryFrame flex flex-col-reverse">
      <div
        className="flex flex-col flex-shrink-0 max-h-full border-t pb-4 border-t-gray-200 bg-gray-100"
        style={{ height: `${controlHeight}px` }}
      >
        <VResizeBar onDone={onResizeBarDone} onMove={onResizeBarMove} />
        <div className="flex-grow grid">{ControlBlock}</div>
      </div>
      <div className="flex-grow overflow-auto bg-stone-50">{HistoryBlock}</div>
    </div>
  );
}
