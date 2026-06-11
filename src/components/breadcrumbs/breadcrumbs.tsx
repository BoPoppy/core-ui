import { Fragment, forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface Crumb {
  label: React.ReactNode;
  href?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: Crumb[];
  /** Separator between crumbs. */
  separator?: React.ReactNode;
}

/** Breadcrumbs — the last item is rendered as the current page. */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, items, separator = "/", ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn("flex flex-wrap items-center gap-2 text-sm", className)}
      {...props}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <Fragment key={i}>
            {isLast || !item.href ? (
              <span
                aria-current={isLast ? "page" : undefined}
                className={cn(isLast ? "font-semibold text-fg" : "text-muted")}
              >
                {item.label}
              </span>
            ) : (
              <a href={item.href} className="text-muted transition-colors hover:text-fg">
                {item.label}
              </a>
            )}
            {!isLast && (
              <span aria-hidden="true" className="text-faint">
                {separator}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  ),
);
Breadcrumbs.displayName = "Breadcrumbs";
