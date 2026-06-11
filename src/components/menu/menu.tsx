import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const Menu = RadixMenu.Root;
export const MenuTrigger = RadixMenu.Trigger;
export const MenuGroup = RadixMenu.Group;

export const MenuContent = forwardRef<
  React.ElementRef<typeof RadixMenu.Content>,
  React.ComponentPropsWithoutRef<typeof RadixMenu.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <RadixMenu.Portal>
    <RadixMenu.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[200px] rounded-sm bg-surface p-1.5 shadow-3 outline-none",
        "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
        "data-[state=open]:animate-[fv-fade-in_140ms_ease]",
        className,
      )}
      {...props}
    />
  </RadixMenu.Portal>
));
MenuContent.displayName = "MenuContent";

export interface MenuItemProps extends React.ComponentPropsWithoutRef<typeof RadixMenu.Item> {
  danger?: boolean;
  /** Trailing shortcut hint (e.g. ⌘K). */
  shortcut?: React.ReactNode;
}

export const MenuItem = forwardRef<React.ElementRef<typeof RadixMenu.Item>, MenuItemProps>(
  ({ className, danger, shortcut, children, ...props }, ref) => (
    <RadixMenu.Item
      ref={ref}
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-[calc(var(--r-sm)-2px)] px-2.5 py-2 text-sm outline-none",
        "transition-colors data-[highlighted]:bg-accent-soft [&_svg]:size-4 [&_svg]:flex-none [&_svg]:opacity-70",
        "data-[disabled]:opacity-45 data-[disabled]:pointer-events-none",
        danger ? "text-danger" : "text-fg",
        className,
      )}
      {...props}
    >
      {children}
      {shortcut && <span className="ms-auto font-mono text-[11px] text-faint">{shortcut}</span>}
    </RadixMenu.Item>
  ),
);
MenuItem.displayName = "MenuItem";

export const MenuSeparator = forwardRef<
  React.ElementRef<typeof RadixMenu.Separator>,
  React.ComponentPropsWithoutRef<typeof RadixMenu.Separator>
>(({ className, ...props }, ref) => (
  <RadixMenu.Separator ref={ref} className={cn("my-1.5 h-px bg-border", className)} {...props} />
));
MenuSeparator.displayName = "MenuSeparator";

export const MenuLabel = forwardRef<
  React.ElementRef<typeof RadixMenu.Label>,
  React.ComponentPropsWithoutRef<typeof RadixMenu.Label>
>(({ className, ...props }, ref) => (
  <RadixMenu.Label
    ref={ref}
    className={cn(
      "px-2.5 pb-1 pt-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-faint",
      className,
    )}
    {...props}
  />
));
MenuLabel.displayName = "MenuLabel";
