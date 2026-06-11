import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** Current page (1-based). */
  page: number;
  /** Total number of pages. */
  count: number;
  onPageChange: (page: number) => void;
  /** How many pages to show around the current one. */
  siblings?: number;
}

const pageClass =
  "inline-grid h-[38px] min-w-[38px] place-items-center px-1.5 text-sm font-semibold cursor-pointer rounded-sm pebble:rounded-full bg-surface text-fg border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg transition-colors hover:bg-accent-soft hover:border-accent disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface";

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/** Pagination — numeric pages with prev/next and ellipsis truncation. */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ className, page, count, onPageChange, siblings = 1, ...props }, ref) => {
    const pages: (number | "...")[] = [];
    const left = Math.max(2, page - siblings);
    const right = Math.min(count - 1, page + siblings);
    pages.push(1);
    if (left > 2) pages.push("...");
    pages.push(...range(left, right));
    if (right < count - 1) pages.push("...");
    if (count > 1) pages.push(count);

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn("inline-flex items-center gap-1", className)}
        {...props}
      >
        <button
          type="button"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className={cn(pageClass, "text-base")}
        >
          ‹
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`dots-${i}`}
              className="inline-grid h-[38px] min-w-[38px] place-items-center text-faint"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              onClick={() => onPageChange(p)}
              className={cn(
                pageClass,
                p === page && "bg-accent! text-accent-fg border-accent! pop:border-fg",
              )}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          aria-label="Next page"
          disabled={page >= count}
          onClick={() => onPageChange(page + 1)}
          className={cn(pageClass, "text-base")}
        >
          ›
        </button>
      </nav>
    );
  },
);
Pagination.displayName = "Pagination";
