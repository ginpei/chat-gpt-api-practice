export interface KeyAssignProps {
  children: React.ReactNode;
  theme?: "normal" | "primary";
}

export function KeyAssign({
  children,
  theme = "normal",
}: KeyAssignProps): JSX.Element {
  return (
    <small
      className={`KeyAssign text-xs ${
        theme === "primary" ? "text-gray-300" : "text-gray-500"
      }`}
    >
      {children}
    </small>
  );
}
