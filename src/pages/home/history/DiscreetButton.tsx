import { ComponentPropsWithoutRef, forwardRef } from "react";

export type DiscreetButtonProps = ComponentPropsWithoutRef<"button">;

export const DiscreetButton = forwardRef<
  HTMLButtonElement,
  DiscreetButtonProps
>(({ className = "", ...props }, ref): JSX.Element => {
  return (
    <button
      className={`
        DiscreetButton ${className}
        border border-stone-200 bg-transparent p-2 text-stone-500
        hover:bg-stone-100
        focus:bg-stone-100
        disabled:bg-gray-100 disabled:text-gray-500
        `}
      ref={ref}
      {...props}
    />
  );
});

DiscreetButton.displayName = "DiscreetButton";
