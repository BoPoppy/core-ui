import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const buttonVariants = cva(
  // base — token-driven; `--press` and `--font-weight-strong` come from the
  // active personality, so the button re-skins across Pebble/Slate/Pop.
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap select-none",
    "rounded-btn border-solid [border-width:var(--line-w)] text-sm [font-weight:var(--font-weight-strong)]",
    "cursor-pointer transition-[transform,box-shadow,background-color,color,border-color,filter] duration-150",
    "active:[transform:var(--press)]",
    "disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none disabled:[transform:none] disabled:filter-none",
    "aria-disabled:opacity-45 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-fg shadow-1 border-transparent hover:bg-accent-hover hover:shadow-2 pop:border-fg",
        secondary:
          "bg-surface text-fg [border-color:var(--line-color)] shadow-1 hover:bg-surface-2 hover:shadow-2",
        ghost: "bg-transparent text-fg border-transparent shadow-none hover:bg-accent-soft",
        danger:
          "bg-danger text-white border-transparent shadow-1 hover:brightness-95 hover:shadow-2 pop:border-fg",
      },
      size: {
        sm: "h-8 px-3.5 text-[13px]",
        md: "h-10 px-5",
        lg: "h-[50px] px-7 text-base",
      },
      iconOnly: {
        true: "px-0 aspect-square",
        false: "",
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", class: "w-8" },
      { iconOnly: true, size: "md", class: "w-10" },
      { iconOnly: true, size: "lg", class: "w-[50px]" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      iconOnly: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element (Radix Slot) — e.g. wrap an `<a>`. */
  asChild?: boolean;
  /** Show a spinner and block interaction. */
  loading?: boolean;
}

const Spinner = () => (
  <span
    aria-hidden="true"
    className="inline-block size-[15px] rounded-full border-2 border-current border-t-transparent animate-[fv-spin_0.7s_linear_infinite]"
  />
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconOnly, asChild, loading, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, iconOnly }), className)}
        disabled={asChild ? undefined : disabled || loading}
        aria-disabled={asChild && (disabled || loading) ? true : undefined}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading && <Spinner />}
            <span className={cn(loading && "opacity-70")}>{children}</span>
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";
