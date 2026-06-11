import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const linkVariants = cva(
  "relative cursor-pointer font-semibold no-underline transition-colors focus-visible:outline-none focus-visible:underline",
  {
    variants: {
      variant: {
        // animated underline that grows from the left on hover
        default:
          "text-accent after:absolute after:inset-x-0 after:-bottom-px after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:after:scale-x-100",
        underline: "text-accent underline underline-offset-[3px]",
        muted: "text-muted hover:text-fg",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, ...props }, ref) => (
    <a ref={ref} className={cn(linkVariants({ variant }), className)} {...props} />
  ),
);
Link.displayName = "Link";
