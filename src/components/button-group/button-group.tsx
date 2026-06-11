import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

/**
 * ButtonGroup — a segmented control of connected buttons (shared borders).
 * Single or multiple selection via the `type` prop (Radix ToggleGroup).
 *
 *   <ButtonGroup type="single" defaultValue="day">
 *     <ButtonGroupItem value="day">Day</ButtonGroupItem>
 *     <ButtonGroupItem value="week">Week</ButtonGroupItem>
 *   </ButtonGroup>
 */
export const ButtonGroup = forwardRef<
  React.ElementRef<typeof ToggleGroup.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroup.Root>
>(({ className, ...props }, ref) => (
  <ToggleGroup.Root ref={ref} className={cn("inline-flex", className)} {...props} />
));
ButtonGroup.displayName = "ButtonGroup";

export const ButtonGroupItem = forwardRef<
  React.ElementRef<typeof ToggleGroup.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroup.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroup.Item
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center px-5 text-sm [font-weight:var(--font-weight-strong)]",
      "cursor-pointer bg-surface text-fg transition-colors duration-150",
      "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
      "rounded-none first:rounded-s-btn last:rounded-e-btn",
      "pebble:first:rounded-s-md pebble:last:rounded-e-md",
      "[&:not(:first-child)]:-ms-px",
      "hover:bg-surface-2",
      "data-[state=on]:z-[1] data-[state=on]:bg-accent data-[state=on]:text-accent-fg data-[state=on]:border-accent",
      "focus-visible:outline-none focus-visible:z-[1] focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]",
      "disabled:opacity-45 disabled:cursor-not-allowed",
      className,
    )}
    {...props}
  />
));
ButtonGroupItem.displayName = "ButtonGroupItem";
