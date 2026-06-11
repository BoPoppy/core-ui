import * as RadixSwitch from "@radix-ui/react-switch";
import { forwardRef, useId } from "react";
import { cn } from "../../lib/cn";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  /** Optional inline label rendered to the right of the track. */
  label?: React.ReactNode;
}

/**
 * Switch — Radix-backed pill toggle. The thumb slides and recolors to the
 * accent-foreground when on, matching the design's `.switch.on` treatment.
 */
export const Switch = forwardRef<React.ElementRef<typeof RadixSwitch.Root>, SwitchProps>(
  ({ className, label, id, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const labelId = `${fieldId}-label`;

    const track = (
      <RadixSwitch.Root
        ref={ref}
        id={fieldId}
        aria-labelledby={label != null ? labelId : undefined}
        className={cn(
          "inline-flex items-center h-6 w-[42px] flex-none rounded-full bg-surface-2",
          "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
          "transition-colors duration-150 cursor-pointer",
          "data-[state=checked]:bg-accent data-[state=checked]:border-accent",
          "focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]",
          "disabled:opacity-45 disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      >
        <RadixSwitch.Thumb
          className={cn(
            "block size-4 rounded-full bg-fg transition-transform duration-150",
            "translate-x-[3px] data-[state=checked]:translate-x-[19px]",
            "data-[state=checked]:bg-accent-fg",
          )}
        />
      </RadixSwitch.Root>
    );

    if (label == null) return track;
    return (
      <label
        htmlFor={fieldId}
        className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-fg"
      >
        {track}
        <span id={labelId}>{label}</span>
      </label>
    );
  },
);
Switch.displayName = "Switch";
