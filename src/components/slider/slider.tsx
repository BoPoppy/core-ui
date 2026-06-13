import * as RadixSlider from "@radix-ui/react-slider";
import { forwardRef, useId, useState } from "react";
import { cn } from "../../lib/cn";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof RadixSlider.Root> {
  /** Visible field label rendered above the track and wired to the thumb(s). */
  label?: string;
  /** Show a value bubble above each thumb on hover/focus. Defaults to `true`. */
  showValue?: boolean;
}

/**
 * Slider — Radix-backed. Supports a single value or a range (pass an array of
 * two values). Renders one thumb per value automatically. Pass `label` for the
 * design's labelled field; omit it for a bare track. A value bubble surfaces the
 * current number on hover/focus (`showValue`).
 */
export const Slider = forwardRef<React.ElementRef<typeof RadixSlider.Root>, SliderProps>(
  (
    { className, label, showValue = true, id, "aria-label": ariaLabel, onValueChange, ...props },
    ref,
  ) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const labelId = `${fieldId}-label`;
    // Track the live value (uncontrolled included) so the bubble can read it.
    const [internalValue, setInternalValue] = useState(
      () => props.value ?? props.defaultValue ?? [0],
    );
    const current = props.value ?? internalValue;
    const thumbCount = current.length;

    const handleValueChange = (next: number[]) => {
      setInternalValue(next);
      onValueChange?.(next);
    };

    const slider = (
      <RadixSlider.Root
        ref={ref}
        id={fieldId}
        onValueChange={handleValueChange}
        className={cn(
          "group relative flex h-9 w-full max-w-[340px] touch-none select-none items-center",
          "data-[disabled]:opacity-45",
          className,
        )}
        {...props}
      >
        <RadixSlider.Track
          className={cn(
            "relative h-1.5 w-full grow overflow-hidden rounded-full bg-surface-2",
            "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
          )}
        >
          <RadixSlider.Range className="absolute h-full bg-accent" />
        </RadixSlider.Track>
        {Array.from({ length: thumbCount }, (_, i) => (
          <RadixSlider.Thumb
            key={i}
            className={cn(
              "relative block size-5 rounded-full bg-surface shadow-1",
              "border-2 border-accent pop:bg-accent pop:border-fg",
              "cursor-grab transition-shadow active:cursor-grabbing",
              "focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--accent-soft)]",
            )}
            // Single thumb borrows the visible label; a range needs a distinct
            // name per thumb, so prefix the label (or the aria-label fallback).
            aria-labelledby={label && thumbCount === 1 ? labelId : undefined}
            aria-label={
              thumbCount > 1
                ? `${label ?? ariaLabel ?? "Value"} ${i + 1}`
                : label
                  ? undefined
                  : (ariaLabel ?? "Value")
            }
          >
            {showValue && (
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -top-[26px] left-1/2 -translate-x-1/2",
                  "rounded-md bg-accent px-1.5 py-px text-[11px] font-bold text-accent-fg",
                  "opacity-0 transition-opacity duration-150",
                  "group-hover:opacity-100 group-focus-within:opacity-100",
                )}
              >
                {current[i]}
              </span>
            )}
          </RadixSlider.Thumb>
        ))}
      </RadixSlider.Root>
    );

    if (!label) return slider;

    return (
      <div className="flex min-w-0 flex-col gap-1.5">
        <label id={labelId} htmlFor={fieldId} className="text-[13px] font-semibold text-fg">
          {label}
        </label>
        {slider}
      </div>
    );
  },
);
Slider.displayName = "Slider";
