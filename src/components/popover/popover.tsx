import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverClose = RadixPopover.Close;
export const PopoverAnchor = RadixPopover.Anchor;

export const PopoverContent = forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Content>
>(({ className, align = "start", sideOffset = 10, children, ...props }, ref) => (
  <RadixPopover.Portal>
    <RadixPopover.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-[260px] rounded-md bg-surface shadow-3 outline-none",
        "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
        "data-[state=open]:animate-[fv-fade-in_160ms_ease]",
        className,
      )}
      {...props}
    >
      {children}
      {/* Arrow rendered as a rotated-square "notch" (matches the design's
          `.popover::before`): a surface-filled square turned 45° showing only
          its two outer borders, so the caret edges read as a continuation of
          the panel border and the fill masks the panel's own border line.
          Radix rotates the arrow per side, so the single bottom/right border
          pair becomes the correct ^ / v / < / > on every placement. */}
      <RadixPopover.Arrow
        className={cn(
          "size-3 translate-y-[calc(-50%_-_1px)] rotate-45 bg-surface fill-surface",
          "border-solid [border-bottom-width:var(--line-w)] [border-right-width:var(--line-w)]",
          "[border-color:var(--card-line-color)] pop:border-fg",
        )}
      />
    </RadixPopover.Content>
  </RadixPopover.Portal>
));
PopoverContent.displayName = "PopoverContent";

/** Optional padded body region. */
export const PopoverBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 p-5", className)} {...props} />
  ),
);
PopoverBody.displayName = "PopoverBody";

export const PopoverTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("text-[15px] [font-weight:var(--font-weight-strong)]", className)}
    {...props}
  />
));
PopoverTitle.displayName = "PopoverTitle";
