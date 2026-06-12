import * as RadixMenubar from "@radix-ui/react-menubar";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const Menubar = forwardRef<
  React.ElementRef<typeof RadixMenubar.Root>,
  React.ComponentPropsWithoutRef<typeof RadixMenubar.Root>
>(({ className, ...props }, ref) => (
  <RadixMenubar.Root
    ref={ref}
    className={cn(
      "inline-flex rounded-sm bg-surface p-[3px] shadow-1",
      "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
      className,
    )}
    {...props}
  />
));
Menubar.displayName = "Menubar";

export const MenubarMenu: typeof RadixMenubar.Menu = RadixMenubar.Menu;

export const MenubarTrigger = forwardRef<
  React.ElementRef<typeof RadixMenubar.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixMenubar.Trigger>
>(({ className, ...props }, ref) => (
  <RadixMenubar.Trigger
    ref={ref}
    className={cn(
      "cursor-pointer rounded-[calc(var(--r-sm)-2px)] px-3.5 py-[7px] text-sm font-semibold text-fg outline-none transition-colors",
      "data-[highlighted]:bg-accent-soft data-[state=open]:bg-accent-soft",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = "MenubarTrigger";

export const MenubarContent = forwardRef<
  React.ElementRef<typeof RadixMenubar.Content>,
  React.ComponentPropsWithoutRef<typeof RadixMenubar.Content>
>(({ className, align = "start", sideOffset = 6, ...props }, ref) => (
  <RadixMenubar.Portal>
    <RadixMenubar.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[200px] rounded-sm bg-surface p-1.5 shadow-3 outline-none",
        "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
        "data-[state=open]:animate-[fv-fade-in_140ms_ease]",
        className,
      )}
      {...props}
    />
  </RadixMenubar.Portal>
));
MenubarContent.displayName = "MenubarContent";

export interface MenubarItemProps extends React.ComponentPropsWithoutRef<typeof RadixMenubar.Item> {
  shortcut?: React.ReactNode;
}

export const MenubarItem = forwardRef<React.ElementRef<typeof RadixMenubar.Item>, MenubarItemProps>(
  ({ className, shortcut, children, ...props }, ref) => (
    <RadixMenubar.Item
      ref={ref}
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-[calc(var(--r-sm)-2px)] px-2.5 py-2 text-sm text-fg outline-none",
        "data-[highlighted]:bg-accent-soft data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
        className,
      )}
      {...props}
    >
      {children}
      {shortcut && <span className="ms-auto font-mono text-[11px] text-faint">{shortcut}</span>}
    </RadixMenubar.Item>
  ),
);
MenubarItem.displayName = "MenubarItem";

export const MenubarSeparator = forwardRef<
  React.ElementRef<typeof RadixMenubar.Separator>,
  React.ComponentPropsWithoutRef<typeof RadixMenubar.Separator>
>(({ className, ...props }, ref) => (
  <RadixMenubar.Separator ref={ref} className={cn("my-1.5 h-px bg-border", className)} {...props} />
));
MenubarSeparator.displayName = "MenubarSeparator";
