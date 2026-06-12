import * as RadixDialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const Drawer = RadixDialog.Root;
export const DrawerTrigger = RadixDialog.Trigger;
export const DrawerClose = RadixDialog.Close;

export const drawerVariants = cva(
  [
    "fixed z-50 flex flex-col bg-surface shadow-3 outline-none",
    "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
  ],
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 w-[280px] max-w-[85vw] data-[state=open]:animate-[fv-slide-in-l_280ms_ease]",
        right:
          "inset-y-0 right-0 w-[280px] max-w-[85vw] data-[state=open]:animate-[fv-slide-in-r_280ms_ease]",
        top: "inset-x-0 top-0 h-[40vh] data-[state=open]:animate-[fv-slide-in-t_280ms_ease]",
        bottom: "inset-x-0 bottom-0 h-[40vh] data-[state=open]:animate-[fv-slide-in-b_280ms_ease]",
      },
    },
    defaultVariants: { side: "left" },
  },
);

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Content>,
    VariantProps<typeof drawerVariants> {}

export const DrawerContent = forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  DrawerContentProps
>(({ className, side = "left", children, ...props }, ref) => (
  <RadixDialog.Portal>
    <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-[fv-overlay-in_250ms_ease]" />
    <RadixDialog.Content ref={ref} className={cn(drawerVariants({ side }), className)} {...props}>
      {children}
    </RadixDialog.Content>
  </RadixDialog.Portal>
));
DrawerContent.displayName = "DrawerContent";

export const DrawerTitle = RadixDialog.Title;
export const DrawerDescription = RadixDialog.Description;
