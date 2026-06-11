import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface BottomNavItem {
  value: string;
  label: React.ReactNode;
  icon: React.ReactNode;
}

export interface BottomNavProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  items: BottomNavItem[];
  value: string;
  onValueChange: (value: string) => void;
}

/** BottomNav — a mobile-style bottom navigation bar. */
export const BottomNav = forwardRef<HTMLElement, BottomNavProps>(
  ({ className, items, value, onValueChange, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        "flex max-w-[420px] overflow-hidden rounded-md bg-surface shadow-1",
        "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
        className,
      )}
      {...props}
    >
      {items.map((item) => {
        const on = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            aria-current={on ? "page" : undefined}
            onClick={() => onValueChange(item.value)}
            className={cn(
              "flex flex-1 cursor-pointer flex-col items-center gap-[3px] px-1 py-2.5 text-[11px] font-semibold transition-colors",
              "[&_svg]:size-[22px]",
              on ? "text-accent dark:text-fg" : "text-faint hover:bg-accent-soft hover:text-muted",
            )}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </nav>
  ),
);
BottomNav.displayName = "BottomNav";
