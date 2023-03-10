import { ComponentPropsWithoutRef, forwardRef } from "react";

export type NiceButtonLinkProps = ComponentPropsWithoutRef<"a">;

export const NiceButtonLink = forwardRef<
  HTMLAnchorElement,
  NiceButtonLinkProps
>(({ className = "", ...props }, ref): JSX.Element => {
  return (
    <a
      className={`
        NiceButtonLink ${className}
        border border-ginpei text-center bg-white p-2 text-ginpei
        hover:bg-stone-50
        focus:bg-stone-50
        disabled:bg-gray-100 disabled:text-gray-500
        `}
      ref={ref}
      {...props}
    />
  );
});

NiceButtonLink.displayName = "NiceButtonLink";
