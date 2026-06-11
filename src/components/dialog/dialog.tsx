import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

const overlayClass =
  "fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] data-[state=open]:animate-[fv-overlay-in_200ms_ease]";

export const DialogContent = forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(({ className, children, ...props }, ref) => (
  <RadixDialog.Portal>
    <RadixDialog.Overlay className={overlayClass} />
    <RadixDialog.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-[420px] -translate-x-1/2 -translate-y-1/2",
        "overflow-hidden rounded-lg bg-surface shadow-3 outline-none",
        "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
        "data-[state=open]:animate-[fv-dialog-in_220ms_cubic-bezier(0.2,0.9,0.3,1.2)]",
        className,
      )}
      {...props}
    >
      {children}
    </RadixDialog.Content>
  </RadixDialog.Portal>
));
DialogContent.displayName = "DialogContent";

export const DialogBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2 p-6", className)} {...props} />
  ),
);
DialogBody.displayName = "DialogBody";

export const DialogTitle = forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={cn(
      "text-[19px] [font-weight:var(--font-weight-strong)] tracking-[-0.01em]",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={cn("text-sm leading-relaxed text-muted", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export const DialogFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex justify-end gap-2.5 bg-bg px-6 py-3.5",
        "border-t-solid [border-top-width:var(--line-w)] [border-color:var(--card-line-color)]",
        className,
      )}
      {...props}
    />
  ),
);
DialogFooter.displayName = "DialogFooter";
