import * as RadixRadio from "@radix-ui/react-radio-group";
import { forwardRef, useId } from "react";
import { cn } from "../../lib/cn";

export const RadioGroup = forwardRef<
  React.ElementRef<typeof RadixRadio.Root>,
  React.ComponentPropsWithoutRef<typeof RadixRadio.Root>
>(({ className, ...props }, ref) => (
  <RadixRadio.Root ref={ref} className={cn("flex flex-col gap-2.5", className)} {...props} />
));
RadioGroup.displayName = "RadioGroup";

export interface RadioProps extends React.ComponentPropsWithoutRef<typeof RadixRadio.Item> {
  /** Optional inline label rendered to the right of the dot. */
  label?: React.ReactNode;
}

/** A single radio option. Must be rendered inside a `RadioGroup`. */
export const Radio = forwardRef<React.ElementRef<typeof RadixRadio.Item>, RadioProps>(
  ({ className, label, id, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const labelId = `${fieldId}-label`;

    const dot = (
      <RadixRadio.Item
        ref={ref}
        id={fieldId}
        aria-labelledby={label != null ? labelId : undefined}
        className={cn(
          "grid size-5 flex-none place-items-center rounded-full bg-surface",
          "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
          "transition-colors duration-150 cursor-pointer",
          "data-[state=checked]:border-accent",
          "focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]",
          "disabled:opacity-45 disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      >
        <RadixRadio.Indicator className="size-[9px] rounded-full bg-accent" />
      </RadixRadio.Item>
    );

    if (label == null) return dot;
    return (
      <label
        htmlFor={fieldId}
        className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-fg"
      >
        {dot}
        <span id={labelId}>{label}</span>
      </label>
    );
  },
);
Radio.displayName = "Radio";
