export interface PopupMenuHeadingProps {
  children: React.ReactNode;
}

export function PopupMenuHeading({
  children,
}: PopupMenuHeadingProps): JSX.Element {
  return (
    <div className="PopupMenuHeading px-4 py-2 text-sm text-gray-500">
      {children}
    </div>
  );
}
