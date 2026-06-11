import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={cn("size-full transition-colors", filled ? "text-warn" : "text-border-strong")}
    fill="currentColor"
  >
    <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9z" />
  </svg>
);

export interface RatingProps {
  /** Controlled value. */
  value?: number;
  /** Uncontrolled initial value. */
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  /** Number of stars. */
  max?: number;
  readOnly?: boolean;
  className?: string;
  "aria-label"?: string;
}

/**
 * Rating — a star rating control. Interactive (click or arrow keys) or
 * read-only. Filled stars use the `--warn` token across personalities.
 */
export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value,
      defaultValue = 0,
      onValueChange,
      max = 5,
      readOnly,
      className,
      "aria-label": ariaLabel = "Rating",
    },
    ref,
  ) => {
    const [internal, setInternal] = useState(defaultValue);
    const [hover, setHover] = useState<number | null>(null);
    const current = value ?? internal;
    const shown = hover ?? current;

    const set = (next: number) => {
      if (readOnly) return;
      if (value === undefined) setInternal(next);
      onValueChange?.(next);
    };

    if (readOnly) {
      return (
        <div
          ref={ref}
          className={cn("inline-flex gap-[3px]", className)}
          role="img"
          aria-label={`${ariaLabel}: ${current} of ${max}`}
        >
          {Array.from({ length: max }, (_, i) => (
            <span key={i} className="size-[26px]">
              <StarIcon filled={i < current} />
            </span>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("inline-flex gap-[3px]", className)}
        role="slider"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={current}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            set(Math.min(max, current + 1));
          } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            set(Math.max(0, current - 1));
          }
        }}
        onMouseLeave={() => setHover(null)}
      >
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1;
          return (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
              className="size-[26px] cursor-pointer transition-transform duration-100 hover:scale-[1.18]"
              onMouseEnter={() => setHover(starValue)}
              onClick={() => set(starValue)}
            >
              <StarIcon filled={starValue <= shown} />
            </button>
          );
        })}
      </div>
    );
  },
);
Rating.displayName = "Rating";
