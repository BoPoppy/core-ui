import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Trailing call-to-action (e.g. a button). */
  action?: React.ReactNode;
}

/** EmptyState — a centered placeholder for empty lists, searches, etc. */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex max-w-[420px] flex-col items-center gap-3 px-6 py-11 text-center",
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="grid size-16 place-items-center rounded-full bg-surface-2 text-faint border-solid [border-width:var(--line-w)] border-border pop:border-fg [&_svg]:size-[30px]">
          {icon}
        </span>
      )}
      {title && (
        <h3 className="text-lg [font-weight:var(--font-weight-strong)] text-fg">{title}</h3>
      )}
      {description && <p className="text-sm leading-snug text-muted">{description}</p>}
      {children}
      {action && <div className="mt-1">{action}</div>}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";
