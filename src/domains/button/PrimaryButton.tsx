import { ComponentPropsWithoutRef, forwardRef } from "react";

export type PrimaryButtonProps = ComponentPropsWithoutRef<"button">;

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className = "", ...props }, ref): JSX.Element => {
    return (
      <button
        className={`
        PrimaryButton ${className}
        border border-ginpei bg-ginpei p-2 text-white
        hover:bg-sky-900
        focus:bg-sky-900
        disabled:bg-gray-400
        `}
        ref={ref}
        {...props}
      />
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";
