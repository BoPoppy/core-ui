import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed";
}

/**
 * Divider — a presentational separator line. Pass children to render a centered
 * label (horizontal only). Use `orientation="vertical"` inside a flex row.
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", variant = "solid", children, ...props }, ref) => {
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          aria-hidden="true"
          className={cn("mx-1 w-px self-stretch bg-border", className)}
          {...props}
        />
      );
    }

    if (children) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-3.5 text-[13px] font-semibold text-faint",
            "before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          variant === "dashed"
            ? "h-0 border-t border-dashed border-border-strong"
            : "h-px bg-border",
          className,
        )}
        {...props}
      />
    );
  },
);
Divider.displayName = "Divider";
