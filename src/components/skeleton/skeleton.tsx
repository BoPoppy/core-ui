import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const skeletonVariants = cva(
  "animate-[fv-shimmer_1.4s_ease_infinite] bg-[linear-gradient(90deg,var(--surface-2)_25%,var(--border)_37%,var(--surface-2)_63%)] bg-[length:400%_100%]",
  {
    variants: {
      variant: {
        block: "rounded-sm",
        text: "h-[13px] rounded-sm",
        circle: "rounded-full",
      },
    },
    defaultVariants: { variant: "block" },
  },
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

/** Skeleton — a shimmering placeholder. Size it with width/height utilities. */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  ),
);
Skeleton.displayName = "Skeleton";
