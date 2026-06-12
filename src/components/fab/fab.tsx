import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const fabVariants = cva(
  [
    "inline-grid place-items-center bg-accent text-accent-fg shadow-2 cursor-pointer",
    "border-solid [border-width:var(--line-w)] border-transparent pop:border-fg",
    "transition-[transform,box-shadow,filter] duration-150",
    "hover:shadow-3 hover:-translate-y-0.5 pop:hover:[transform:translate(-2px,-2px)]",
    "active:[transform:var(--press)]",
    "disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none disabled:[transform:none]",
    "focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--accent-soft)]",
    // personality corner shapes (pebble = circle by default)
    "rounded-full slate:rounded-[16px] pop:rounded-[18px]",
  ],
  {
    variants: {
      size: {
        sm: "size-[42px] [&_svg]:size-[18px]",
        md: "size-14 [&_svg]:size-6",
      },
      extended: {
        true: "w-auto h-13 gap-2.5 px-[22px] text-[15px] [font-weight:var(--font-weight-strong)] rounded-full pop:rounded-[14px]",
        false: "",
      },
    },
    defaultVariants: { size: "md", extended: false },
  },
);

export interface FabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {}

/** Floating Action Button. Use `extended` for a labelled pill variant. */
export const Fab = forwardRef<HTMLButtonElement, FabProps>(
  ({ className, size, extended, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(fabVariants({ size, extended }), className)}
      {...props}
    />
  ),
);
Fab.displayName = "Fab";
