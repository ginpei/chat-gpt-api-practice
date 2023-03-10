import { ComponentPropsWithoutRef, forwardRef } from "react";

export type NiceTextProps = ComponentPropsWithoutRef<"textarea">;

export const NiceText = forwardRef<HTMLTextAreaElement, NiceTextProps>(
  ({ className = "", ...props }, ref): JSX.Element => {
    return (
      <textarea
        className={`
        ${className} NiceText
        border border-ginpei p-2
        hover:shadow-inner
        `}
        ref={ref}
        {...props}
      />
    );
  }
);

NiceText.displayName = "NiceText";
