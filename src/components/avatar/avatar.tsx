import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const avatarVariants = cva(
  [
    "relative inline-grid place-items-center flex-none overflow-visible rounded-full",
    "bg-surface-2 text-muted [font-weight:var(--font-weight-strong)]",
    "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
    "slate:rounded-sm",
  ],
  {
    variants: {
      size: {
        xs: "size-6 text-[9px]",
        sm: "size-8 text-xs",
        md: "size-10 text-[15px]",
        lg: "size-14 text-[21px]",
        xl: "size-[76px] text-[29px]",
      },
      variant: {
        neutral: "",
        accent: "bg-accent text-accent-fg border-transparent pop:border-fg",
      },
    },
    defaultVariants: { size: "md", variant: "neutral" },
  },
);

const STATUS_COLOR = {
  online: "bg-success",
  busy: "bg-danger",
  offline: "bg-faint",
} as const;

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  /** Fallback content (e.g. initials) shown when there's no image. */
  fallback?: React.ReactNode;
  status?: keyof typeof STATUS_COLOR;
}

/** Avatar — image with initials/icon fallback and an optional status dot. */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, variant, src, alt, fallback, status, children, ...props }, ref) => (
    <span ref={ref} className={cn(avatarVariants({ size, variant }), className)} {...props}>
      {src ? (
        <img src={src} alt={alt ?? ""} className="size-full rounded-[inherit] object-cover" />
      ) : (
        (fallback ?? children)
      )}
      {status && (
        <span
          role="img"
          aria-label={status}
          className={cn(
            "absolute end-0 bottom-0 size-[30%] min-h-2 min-w-2 rounded-full border-2 [border-color:var(--surface)]",
            STATUS_COLOR[status],
          )}
        />
      )}
    </span>
  ),
);
Avatar.displayName = "Avatar";

/** Stacks avatars with an overlap; each lifts on hover. */
export const AvatarGroup = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center",
        "[&>*]:border-2 [&>*]:[border-color:var(--bg)] [&>*]:-ms-3 [&>*:first-child]:ms-0",
        "[&>*]:transition-transform hover:[&>*]:-translate-y-0.5",
        className,
      )}
      {...props}
    />
  ),
);
AvatarGroup.displayName = "AvatarGroup";
