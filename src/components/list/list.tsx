import { forwardRef } from "react";
import { cn } from "../../lib/cn";

/** List — a bordered, elevated container for `ListItem`s. */
export const List = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn(
        "max-w-[420px] overflow-hidden rounded-md bg-surface shadow-1",
        "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
        className,
      )}
      {...props}
    />
  ),
);
List.displayName = "List";

export interface ListItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  /** Leading icon, rendered in a tinted square (circle in Pebble). */
  icon?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Trailing meta content, pushed to the end. */
  meta?: React.ReactNode;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, icon, title, subtitle, meta, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        "flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0",
        "transition-colors duration-100 hover:bg-accent-soft",
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="grid size-9 flex-none place-items-center rounded-sm bg-accent-soft text-fg pebble:rounded-full [&_svg]:size-[18px]">
          {icon}
        </span>
      )}
      {(title || subtitle) && (
        <span className="flex min-w-0 flex-1 flex-col">
          {title && <span className="truncate text-sm font-semibold text-fg">{title}</span>}
          {subtitle && <span className="truncate text-xs text-muted">{subtitle}</span>}
        </span>
      )}
      {children}
      {meta && <span className="ms-auto flex-none text-xs text-faint">{meta}</span>}
    </li>
  ),
);
ListItem.displayName = "ListItem";
