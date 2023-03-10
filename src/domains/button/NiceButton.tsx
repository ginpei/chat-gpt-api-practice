import { ComponentPropsWithoutRef, forwardRef } from "react";

export type NiceButtonProps = ComponentPropsWithoutRef<"button">;

export const NiceButton = forwardRef<HTMLButtonElement, NiceButtonProps>(
  ({ className = "", ...props }, ref): JSX.Element => {
    return (
      <button
        className={`
        NiceButton ${className}
        border border-ginpei bg-white p-2 text-ginpei
        hover:bg-stone-50
        focus:bg-stone-50
        disabled:bg-gray-100 disabled:text-gray-500
        `}
        ref={ref}
        {...props}
      />
    );
  }
);

NiceButton.displayName = "NiceButton";
