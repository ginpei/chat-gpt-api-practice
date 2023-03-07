export interface HStackProps {
  children: React.ReactNode;
  gap?: `gap-${string}`;
}

export function HStack({ children, gap = "gap-2" }: HStackProps): JSX.Element {
  return <div className={`HStack flex ${gap}`}>{children}</div>;
}
