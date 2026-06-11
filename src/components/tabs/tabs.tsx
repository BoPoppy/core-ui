import * as RadixTabs from "@radix-ui/react-tabs";
import { createContext, forwardRef, useContext } from "react";
import { cn } from "../../lib/cn";

type TabsVariant = "underline" | "pill";
const VariantContext = createContext<TabsVariant>("underline");

export const Tabs = RadixTabs.Root;

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof RadixTabs.List> {
  variant?: TabsVariant;
}

export const TabsList = forwardRef<React.ElementRef<typeof RadixTabs.List>, TabsListProps>(
  ({ className, variant = "underline", ...props }, ref) => (
    <VariantContext.Provider value={variant}>
      <RadixTabs.List
        ref={ref}
        className={cn(
          variant === "underline" &&
            "flex gap-0.5 border-b-solid [border-bottom-width:var(--line-w)] border-border",
          variant === "pill" && "inline-flex gap-1 rounded-btn bg-surface-2 p-1",
          className,
        )}
        {...props}
      />
    </VariantContext.Provider>
  ),
);
TabsList.displayName = "TabsList";

export const TabsTrigger = forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(({ className, ...props }, ref) => {
  const variant = useContext(VariantContext);
  return (
    <RadixTabs.Trigger
      ref={ref}
      className={cn(
        "relative cursor-pointer font-semibold text-muted transition-colors hover:text-fg",
        "data-[state=active]:text-fg focus-visible:outline-none",
        variant === "underline" &&
          "px-4 py-3 text-sm data-[state=active]:after:absolute data-[state=active]:after:inset-x-2 data-[state=active]:after:-bottom-px data-[state=active]:after:h-[2.5px] data-[state=active]:after:rounded-[2px] data-[state=active]:after:bg-accent",
        variant === "pill" &&
          "rounded-[calc(var(--btn-radius)-4px)] px-4 py-2 text-sm data-[state=active]:bg-surface data-[state=active]:shadow-1",
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(({ className, ...props }, ref) => (
  <RadixTabs.Content
    ref={ref}
    className={cn("py-4 text-sm leading-relaxed text-muted focus-visible:outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";
