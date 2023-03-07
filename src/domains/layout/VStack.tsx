export interface VStackProps {
  children: React.ReactNode;
  gap?: `gap-${string}`;
}

export function VStack({ children, gap = "gap-2" }: VStackProps): JSX.Element {
  return <div className={`VStack flex flex-col ${gap}`}>{children}</div>;
}
