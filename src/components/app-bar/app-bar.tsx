import { forwardRef } from "react";
import { cn } from "../../lib/cn";

/**
 * AppBar — a top application bar in the accent color. Compose freely:
 *
 *   <AppBar>
 *     <AppBarIcon aria-label="Menu">☰</AppBarIcon>
 *     <AppBarTitle>Dashboard</AppBarTitle>
 *     <AppBarSpacer />
 *     <Avatar size="sm" fallback="TV" />
 *   </AppBar>
 */
export const AppBar = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "flex h-15 items-center gap-3.5 rounded-md bg-accent px-[18px] text-accent-fg shadow-2",
        "pop:border-solid pop:[border-width:var(--line-w)] pop:border-fg",
        className,
      )}
      {...props}
    />
  ),
);
AppBar.displayName = "AppBar";

export const AppBarTitle = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "text-lg tracking-[-0.01em] [font-weight:var(--font-weight-strong)]",
        className,
      )}
      {...props}
    />
  ),
);
AppBarTitle.displayName = "AppBarTitle";

export const AppBarIcon = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "grid size-[22px] cursor-pointer place-items-center opacity-90 transition-opacity hover:opacity-100 [&_svg]:size-full",
      className,
    )}
    {...props}
  />
));
AppBarIcon.displayName = "AppBarIcon";

export const AppBarSpacer = () => <span className="ms-auto" />;
