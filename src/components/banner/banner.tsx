import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const bannerVariants = cva("flex items-center gap-3 rounded-md px-[18px] py-3.5", {
  variants: {
    variant: {
      solid:
        "bg-accent text-accent-fg border-solid [border-width:var(--line-w)] border-transparent pop:border-fg",
      subtle:
        "bg-accent-soft text-fg border-solid [border-width:var(--line-w)] border-border pop:border-fg",
    },
  },
  defaultVariants: { variant: "solid" },
});

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode;
  /** Secondary line below the main text. */
  description?: React.ReactNode;
  /** Trailing actions (e.g. buttons). */
  action?: React.ReactNode;
  onClose?: () => void;
}

/** Banner — a page-level message bar (vs the inline `Alert`). */
export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    { className, variant = "solid", icon, description, action, onClose, children, ...props },
    ref,
  ) => (
    <div ref={ref} className={cn(bannerVariants({ variant }), className)} {...props}>
      {icon && <span className="size-5 flex-none [&_svg]:size-full">{icon}</span>}
      <div className="flex-1 text-sm font-semibold">
        {children}
        {description && (
          <small className="block text-[13px] font-normal opacity-85">{description}</small>
        )}
      </div>
      {action && <div className="flex flex-none items-center gap-2">{action}</div>}
      {onClose && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="flex-none text-lg leading-none opacity-70 transition-opacity hover:opacity-100"
        >
          ✕
        </button>
      )}
    </div>
  ),
);
Banner.displayName = "Banner";
