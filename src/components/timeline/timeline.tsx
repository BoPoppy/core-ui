import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface TimelineItem {
  title: React.ReactNode;
  description?: React.ReactNode;
  time?: React.ReactNode;
  status?: "done" | "active" | "upcoming";
}

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[];
}

/** Timeline — a vertical activity feed with status nodes and a connecting line. */
export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, items, ...props }, ref) => (
    <ol ref={ref} className={cn("relative max-w-[480px] ps-1.5", className)} {...props}>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        const status = item.status ?? "upcoming";
        return (
          <li key={i} className="relative ps-[30px] pb-[22px] last:pb-0">
            {!last && (
              <span className="absolute left-[7px] top-[18px] bottom-[-4px] w-0.5 bg-border-strong" />
            )}
            <span
              className={cn(
                "absolute left-0 top-0.5 z-[1] size-4 rounded-full border-2",
                status === "done" && "bg-accent border-accent",
                status === "active" &&
                  "bg-surface border-accent shadow-[0_0_0_4px_var(--accent-soft)]",
                status === "upcoming" && "bg-surface border-border-strong",
              )}
            />
            {item.time && <span className="text-xs font-semibold text-faint">{item.time}</span>}
            <span className="my-0.5 block text-sm font-semibold text-fg">{item.title}</span>
            {item.description && (
              <span className="block text-[13px] leading-snug text-muted">{item.description}</span>
            )}
          </li>
        );
      })}
    </ol>
  ),
);
Timeline.displayName = "Timeline";
