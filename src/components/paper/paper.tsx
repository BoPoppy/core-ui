import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const paperVariants = cva(
  "rounded-md bg-surface p-5 border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
  {
    variants: {
      elevation: {
        0: "shadow-none",
        1: "shadow-1",
        2: "shadow-2",
        3: "shadow-3",
      },
    },
    defaultVariants: { elevation: 1 },
  },
);

export interface PaperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paperVariants> {}

/** Paper — a plain elevated surface (4 elevation levels). */
export const Paper = forwardRef<HTMLDivElement, PaperProps>(
  ({ className, elevation, ...props }, ref) => (
    <div ref={ref} className={cn(paperVariants({ elevation }), className)} {...props} />
  ),
);
Paper.displayName = "Paper";
