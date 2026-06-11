import * as RadixAccordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const Accordion = forwardRef<
  React.ElementRef<typeof RadixAccordion.Root>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Root>
>(({ className, ...props }, ref) => (
  <RadixAccordion.Root
    ref={ref}
    className={cn(
      "max-w-[560px] overflow-hidden rounded-md bg-surface shadow-1",
      "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
      className,
    )}
    {...props}
  />
));
Accordion.displayName = "Accordion";

export const AccordionItem = forwardRef<
  React.ElementRef<typeof RadixAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(({ className, ...props }, ref) => (
  <RadixAccordion.Item
    ref={ref}
    className={cn("border-b border-border last:border-b-0", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const ChevronIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="ms-auto size-5 flex-none text-muted transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-fg"
  >
    <path
      d="m6 9 6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AccordionTrigger = forwardRef<
  React.ElementRef<typeof RadixAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Header className="flex">
    <RadixAccordion.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 cursor-pointer items-center gap-3 px-4 py-3.5 text-left text-[15px] font-semibold text-fg",
        "transition-colors hover:bg-accent-soft focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronIcon />
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<
  React.ElementRef<typeof RadixAccordion.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm leading-relaxed text-muted",
      "data-[state=open]:animate-[fv-acc-down_300ms_ease] data-[state=closed]:animate-[fv-acc-up_250ms_ease]",
      className,
    )}
    {...props}
  >
    <div className="px-4 pb-4">{children}</div>
  </RadixAccordion.Content>
));
AccordionContent.displayName = "AccordionContent";
