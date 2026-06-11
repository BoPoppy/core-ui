import { forwardRef, useId } from "react";
import { cn } from "../../lib/cn";

const ChevronIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted"
  >
    <path
      d="m6 9 6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
}

/**
 * Select — a styled native `<select>` (keeps native a11y + mobile pickers).
 * Mirrors the design's `select.input` with a token-driven chevron.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, hint, error, id, children, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const msgId = `${fieldId}-msg`;
    const message = error ?? hint;

    return (
      <div className="flex min-w-0 flex-col gap-1.5">
        {label && (
          <label htmlFor={fieldId} className="text-[13px] font-semibold text-fg">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={fieldId}
            aria-invalid={error ? true : undefined}
            aria-describedby={message ? msgId : undefined}
            className={cn(
              "h-[42px] w-full cursor-pointer appearance-none bg-surface pe-9 ps-3.5 text-sm text-fg outline-none",
              "rounded-sm border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
              "transition-[border-color,box-shadow] duration-150",
              "focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]",
              "disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-faint",
              error && "border-danger! shadow-[0_0_0_3px_var(--danger-soft)]",
              className,
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronIcon />
        </div>
        {message && (
          <span id={msgId} className={cn("text-xs text-muted", error && "text-danger")}>
            {message}
          </span>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";
