import * as RadixSlider from "@radix-ui/react-slider";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof RadixSlider.Root> {}

/**
 * Slider — Radix-backed. Supports a single value or a range (pass an array of
 * two values). Renders one thumb per value automatically.
 */
export const Slider = forwardRef<React.ElementRef<typeof RadixSlider.Root>, SliderProps>(
  ({ className, ...props }, ref) => {
    const values = props.value ?? props.defaultValue ?? [0];
    const thumbCount = Array.isArray(values) ? values.length : 1;

    return (
      <RadixSlider.Root
        ref={ref}
        className={cn(
          "relative flex h-9 w-full max-w-[340px] touch-none select-none items-center",
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
              "block size-5 rounded-full bg-surface shadow-1",
              "border-2 border-accent pop:bg-accent pop:border-fg",
              "cursor-grab transition-shadow active:cursor-grabbing",
              "focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--accent-soft)]",
            )}
            aria-label={thumbCount > 1 ? `Value ${i + 1}` : "Value"}
          />
        ))}
      </RadixSlider.Root>
    );
  },
);
Slider.displayName = "Slider";
