import { appTitle } from "../app/static";

export interface HeadLineProps {}

export function HeadLine(): JSX.Element {
  return (
    <div className="HeadLine border-b px-4 text-[10px] bg-ginpei text-white">
      {appTitle}
    </div>
  );
}
