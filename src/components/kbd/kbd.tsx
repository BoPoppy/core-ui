import { forwardRef } from "react";
import { cn } from "../../lib/cn";

/** Kbd — a keyboard key cap. Render one per key; wrap several in `KbdCombo`. */
export const Kbd = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex h-6 min-w-6 items-center justify-center px-[7px]",
        "font-mono text-xs font-bold text-fg",
        "rounded-[6px] bg-surface-2 border-solid [border-width:var(--line-w)] border-b-[2.5px] border-border-strong pop:border-fg",
        className,
      )}
      {...props}
    />
  ),
);
Kbd.displayName = "Kbd";

/** Groups several `Kbd` keys with a muted separator (e.g. ⌘ + K). */
export const KbdCombo = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("inline-flex items-center gap-[5px] text-[13px] text-muted", className)}
      {...props}
    />
  ),
);
KbdCombo.displayName = "KbdCombo";
