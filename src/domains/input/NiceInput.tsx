import { ComponentPropsWithoutRef, forwardRef } from "react";

export type NiceInputProps = ComponentPropsWithoutRef<"input">;

export const NiceInput = forwardRef<HTMLInputElement, NiceInputProps>(
  ({ className = "", ...props }, ref): JSX.Element => {
    return (
      <input
        className={`
        NiceInput ${className}
        border border-ginpei p-2
        hover:shadow-inner
        `}
        ref={ref}
        {...props}
      />
    );
  }
);

NiceInput.displayName = "NiceInput";
