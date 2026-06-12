import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const alertVariants = cva(
  "flex items-start gap-3 rounded-md border-solid [border-width:var(--line-w)] border-transparent pop:border-fg p-4 text-sm",
  {
    variants: {
      variant: {
        info: "bg-accent-soft text-fg",
        success: "bg-success-soft text-success",
        warn: "bg-warn/12 text-warn",
        danger: "bg-danger-soft text-danger",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

const ICONS: Record<string, React.ReactNode> = {
  info: <path d="M12 8h.01M11 12h1v4h1M12 2a10 10 0 100 20 10 10 0 000-20z" />,
  success: <path d="M9 12l2 2 4-4M12 2a10 10 0 100 20 10 10 0 000-20z" />,
  warn: (
    <path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
  ),
  danger: <path d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />,
};

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode;
  /** Custom icon. Defaults to a per-variant glyph. Pass `null` to hide. */
  icon?: React.ReactNode;
  /** Renders a dismiss button and calls this on click. */
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", title, icon, onClose, children, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      {icon !== null && (
        <span className="mt-px size-5 flex-none">
          {icon ?? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-full"
            >
              {ICONS[variant ?? "info"]}
            </svg>
          )}
        </span>
      )}
      <div className="min-w-0 flex-1">
        {title && <div className="font-bold">{title}</div>}
        {children && <div className="leading-snug opacity-85">{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="flex-none text-base leading-none opacity-50 transition-opacity hover:opacity-100"
        >
          ✕
        </button>
      )}
    </div>
  ),
);
Alert.displayName = "Alert";
