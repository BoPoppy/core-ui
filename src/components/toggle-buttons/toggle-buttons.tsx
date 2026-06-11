import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

/**
 * ToggleButtons — a padded "pill" segmented control (iOS-style). The selected
 * item floats above a recessed track. Single or multiple via the `type` prop.
 */
export const ToggleButtons = forwardRef<
  React.ElementRef<typeof ToggleGroup.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroup.Root>
>(({ className, ...props }, ref) => (
  <ToggleGroup.Root
    ref={ref}
    className={cn(
      "inline-flex gap-[3px] rounded-btn bg-surface-2 p-[3px]",
      "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
      className,
    )}
    {...props}
  />
));
ToggleButtons.displayName = "ToggleButtons";

export const ToggleButtonsItem = forwardRef<
  React.ElementRef<typeof ToggleGroup.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroup.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroup.Item
    ref={ref}
    className={cn(
      "inline-flex h-[34px] items-center justify-center gap-1.5 px-3.5 text-[13px] font-semibold",
      "cursor-pointer border-none bg-transparent text-muted [border-radius:calc(var(--btn-radius)-3px)]",
      "transition-colors duration-150 [&_svg]:size-4",
      "hover:text-fg",
      "data-[state=on]:bg-surface data-[state=on]:text-fg data-[state=on]:shadow-1",
      "focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]",
      "disabled:opacity-45 disabled:cursor-not-allowed",
      className,
    )}
    {...props}
  />
));
ToggleButtonsItem.displayName = "ToggleButtonsItem";
