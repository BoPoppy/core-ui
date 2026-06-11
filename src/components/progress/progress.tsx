import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100. Omit for an indeterminate bar. */
  value?: number;
}

/** Linear progress bar. Determinate when `value` is set, else indeterminate. */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => {
    const indeterminate = value == null;
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          "h-2 w-full max-w-[340px] overflow-hidden rounded-full bg-surface-2",
          "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full rounded-full bg-accent",
            indeterminate
              ? "w-2/5 animate-[fv-indeterminate_1.3s_ease-in-out_infinite]"
              : "transition-[width] duration-400",
          )}
          style={indeterminate ? undefined : { width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    );
  },
);
Progress.displayName = "Progress";

export interface CircularProgressProps extends React.SVGAttributes<SVGSVGElement> {
  value: number;
  size?: number;
  /** Show the percentage in the center. */
  showLabel?: boolean;
}

/** Circular (ring) progress indicator. */
export function CircularProgress({
  value,
  size = 64,
  showLabel,
  className,
  ...props
}: CircularProgressProps) {
  const r = 26;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <span
      className="relative inline-grid place-items-center"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg viewBox="0 0 64 64" className={cn("size-full -rotate-90", className)} {...props}>
        <circle cx="32" cy="32" r={r} fill="none" className="stroke-surface-2" strokeWidth="7" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          className="stroke-accent transition-[stroke-dashoffset] duration-400"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * clamped) / 100}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-sm font-bold text-fg">{Math.round(clamped)}%</span>
      )}
    </span>
  );
}

/** Indeterminate spinner. */
export function Spinner({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block size-10 rounded-full border-4 border-surface-2 border-t-accent",
        "animate-[fv-spin_0.8s_linear_infinite]",
        className,
      )}
      {...props}
    />
  );
}
