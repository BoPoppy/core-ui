import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 h-6 px-2.5 text-xs [font-weight:var(--font-weight-strong)]",
    "rounded-sm border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg pebble:rounded-full",
  ],
  {
    variants: {
      variant: {
        neutral: "bg-surface-2 text-fg",
        accent: "bg-accent text-accent-fg border-transparent pop:border-fg",
        success: "bg-success-soft text-success border-transparent",
        danger: "bg-danger-soft text-danger border-transparent",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Render a small leading status dot in the current text color. */
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, dot, children, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span aria-hidden="true" className="size-[7px] rounded-full bg-current" />}
      {children}
    </span>
  ),
);
Badge.displayName = "Badge";
