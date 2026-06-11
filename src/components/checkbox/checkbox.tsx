import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { forwardRef, useId } from "react";
import { cn } from "../../lib/cn";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-3" aria-hidden="true">
    <path
      d="M20 6 9 17l-5-5"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  /** Optional inline label rendered to the right of the box. */
  label?: React.ReactNode;
}

/**
 * Checkbox — Radix-backed, token-styled. Fills with the accent when checked,
 * matching the design's `.choice.on .cbox` treatment across personalities.
 */
export const Checkbox = forwardRef<React.ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const labelId = `${fieldId}-label`;

    const box = (
      <RadixCheckbox.Root
        ref={ref}
        id={fieldId}
        aria-labelledby={label != null ? labelId : undefined}
        className={cn(
          "grid size-5 flex-none place-items-center bg-surface text-accent-fg",
          "rounded-sm pebble:rounded-[7px] border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
          "transition-[background-color,border-color] duration-150 cursor-pointer",
          "data-[state=checked]:bg-accent data-[state=checked]:border-accent",
          "focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]",
          "disabled:opacity-45 disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      >
        <RadixCheckbox.Indicator>
          <CheckIcon />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
    );

    if (label == null) return box;
    return (
      <label
        htmlFor={fieldId}
        className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-fg"
      >
        {box}
        <span id={labelId}>{label}</span>
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";
