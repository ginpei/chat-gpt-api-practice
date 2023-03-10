import { ComponentPropsWithoutRef, forwardRef } from "react";

export type PrimaryButtonProps = ComponentPropsWithoutRef<"button">;

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className = "", ...props }, ref): JSX.Element => {
    return (
      <button
        className={`
        PrimaryButton ${className}
        border border-ginpei bg-ginpei p-2 text-white
        hover:shadow-inner
        `}
        ref={ref}
        {...props}
      />
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";
