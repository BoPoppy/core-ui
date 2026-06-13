import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

/**
 * ButtonGroup — a row of connected buttons with shared borders and rounded
 * ends. It has two modes, selected by whether you pass `type`:
 *
 * 1. **Segmented control** (`type="single" | "multiple"`) — a Radix ToggleGroup
 *    that tracks selection. Children are `<ButtonGroupItem>`s.
 *
 *      <ButtonGroup type="single" defaultValue="day">
 *        <ButtonGroupItem value="day">Day</ButtonGroupItem>
 *        <ButtonGroupItem value="week">Week</ButtonGroupItem>
 *      </ButtonGroup>
 *
 * 2. **Grouped actions** (no `type`) — a presentational `<div role="group">`
 *    that visually connects plain `<Button>` children. Nothing is selected;
 *    each button is an independent action.
 *
 *      <ButtonGroup>
 *        <Button variant="secondary">Save</Button>
 *        <Button variant="secondary">Duplicate</Button>
 *      </ButtonGroup>
 */

// The "connect the ends" treatment for the non-toggle action group: kill each
// child Button's own radius/shadow, overlap their borders, and round only the
// outer ends — mirroring the logic baked into <ButtonGroupItem>. The child
// selectors are specific enough (incl. `:hover`) to win over Button's own
// utilities without resorting to `!important`.
const actionGroupClass = cn(
  "inline-flex",
  "[&>button]:rounded-none [&>button]:shadow-none [&>button:hover]:shadow-none",
  "[&>button:not(:first-child)]:-ms-px",
  "[&>button:first-child]:rounded-s-btn [&>button:last-child]:rounded-e-btn",
  "pebble:[&>button:first-child]:rounded-s-md pebble:[&>button:last-child]:rounded-e-md",
);

type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroup.Root>;
type ActionGroupProps = React.HTMLAttributes<HTMLDivElement> & { type?: never };
export type ButtonGroupProps = ToggleGroupProps | ActionGroupProps;

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>((props, ref) => {
  // No `type` → grouped-actions mode: a plain container that just connects its
  // <Button> children. (ToggleGroup would impose selection semantics.)
  if (props.type == null) {
    const { className, ...rest } = props as ActionGroupProps;
    return <div ref={ref} role="group" className={cn(actionGroupClass, className)} {...rest} />;
  }
  // Otherwise → segmented control via Radix ToggleGroup.
  const { className, ...rest } = props;
  return <ToggleGroup.Root ref={ref} className={cn("inline-flex", className)} {...rest} />;
});
ButtonGroup.displayName = "ButtonGroup";

export const ButtonGroupItem = forwardRef<
  React.ElementRef<typeof ToggleGroup.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroup.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroup.Item
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center px-5 text-sm [font-weight:var(--font-weight-strong)]",
      "cursor-pointer bg-surface text-fg transition-[transform,box-shadow,background-color,color,border-color] duration-150",
      "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
      "rounded-none first:rounded-s-btn last:rounded-e-btn",
      "pebble:first:rounded-s-md pebble:last:rounded-e-md",
      "[&:not(:first-child)]:-ms-px",
      "hover:bg-surface-2 active:[transform:var(--press)]",
      "data-[state=on]:z-[1] data-[state=on]:bg-accent data-[state=on]:text-accent-fg data-[state=on]:border-accent",
      "focus-visible:outline-none focus-visible:z-[1] focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]",
      "disabled:opacity-45 disabled:cursor-not-allowed",
      className,
    )}
    {...props}
  />
));
ButtonGroupItem.displayName = "ButtonGroupItem";
