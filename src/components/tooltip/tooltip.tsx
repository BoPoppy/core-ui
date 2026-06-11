import * as RadixTooltip from "@radix-ui/react-tooltip";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const TooltipProvider = RadixTooltip.Provider;

export interface TooltipProps
  extends Pick<RadixTooltip.TooltipContentProps, "side" | "align" | "sideOffset"> {
  /** The tooltip text/content. */
  content: React.ReactNode;
  children: React.ReactNode;
  delayDuration?: number;
  defaultOpen?: boolean;
}

/**
 * Tooltip — Radix-backed, dark "ink" bubble matching the design's `.tip`.
 * Self-contained (includes its own Provider) so it works standalone; for many
 * tooltips, wrap your app in `<TooltipProvider>` and use the primitives.
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      side = "top",
      align = "center",
      sideOffset = 8,
      delayDuration = 200,
      defaultOpen,
    },
    ref,
  ) => (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root defaultOpen={defaultOpen}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            ref={ref}
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={cn(
              "z-50 rounded-sm bg-fg px-2.5 py-1.5 text-xs font-semibold text-bg shadow-2",
              "select-none",
              "data-[state=delayed-open]:animate-[fv-fade-in_120ms_ease]",
            )}
          >
            {content}
            <RadixTooltip.Arrow className="fill-fg" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  ),
);
Tooltip.displayName = "Tooltip";
