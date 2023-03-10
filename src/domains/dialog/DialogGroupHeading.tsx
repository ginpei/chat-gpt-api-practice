import { ComponentPropsWithoutRef, forwardRef } from "react";

export type DialogGroupHeadingProps = ComponentPropsWithoutRef<"h1">;

export const DialogGroupHeading = forwardRef<
  HTMLHeadingElement,
  DialogGroupHeadingProps
>(({ className = "", ...props }, ref): JSX.Element => {
  return (
    <h1
      className={`
        DialogGroupHeading ${className}
        text-sm text-gray-500
        `}
      ref={ref}
      {...props}
    />
  );
});

DialogGroupHeading.displayName = "DialogGroupHeading";
