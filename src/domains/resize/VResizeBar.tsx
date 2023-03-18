import { Dragger, DragPositionHandler } from "./Dragger";

export interface VResizeBarProps {
  onDone?: DragPositionHandler;
  onMove?: DragPositionHandler;
}

export function VResizeBar({ onDone, onMove }: VResizeBarProps): JSX.Element {
  return (
    <Dragger onDone={onDone} onMove={onMove}>
      <div
        className="
          text-center cursor-ns-resize text-gray-400
          hover:bg-gray-200
        "
      >
        <svg className="inline-block w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M 0,10 l 24,0 l0, 1 l-24,0" stroke="currentColor"></path>
          <path d="M 0,14 l 24,0 l0, 1 l-24,0" stroke="currentColor"></path>
        </svg>
      </div>
    </Dragger>
  );
}
