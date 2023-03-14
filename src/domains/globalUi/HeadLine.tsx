import { appTitle } from "../app/static";
import { Container } from "../layout/Container";

export interface HeadLineProps {}

export function HeadLine(): JSX.Element {
  return (
    <div className="HeadLine border-b text-[10px] bg-ginpei text-white">
      <Container>{appTitle}</Container>
    </div>
  );
}
