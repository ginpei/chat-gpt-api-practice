import { ComponentPropsWithoutRef } from "react";

type MenuItemProps = ComponentPropsWithoutRef<"button">;
export function PopupMenuItem(props: MenuItemProps): JSX.Element {
  return (
    <button
      className="
        MenuItem
        p-4 text-start
        hover:bg-gray-50
        focus:bg-gray-50
        active:bg-gray-100
        disabled:text-gray-400 disabled:grayscale
      "
      {...props}
    />
  );
}
