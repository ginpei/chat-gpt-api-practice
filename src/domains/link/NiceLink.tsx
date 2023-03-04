import { ComponentPropsWithoutRef, forwardRef } from "react";

export type NiceLinkProps = ComponentPropsWithoutRef<"a">;

export const NiceLink = forwardRef<HTMLAnchorElement, NiceLinkProps>(
  ({ className = "", ...props }, ref): JSX.Element => {
    return (
      <a
        className={`NiceLink ${className} underline text-sky-700 hover:text-red-700`}
        ref={ref}
        {...props}
      />
    );
  }
);

NiceLink.displayName = "NiceLink";
