import { forwardRef } from "react";
import { cn } from "../../lib/cn";

/**
 * Card — a token-driven surface. Composed from sub-parts:
 *
 *   <Card>
 *     <CardMedia>…</CardMedia>
 *     <CardBody>
 *       <CardTitle>…</CardTitle>
 *       <CardText>…</CardText>
 *     </CardBody>
 *     <CardFooter>…</CardFooter>
 *   </Card>
 */
export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)]",
        "bg-surface shadow-2 transition-[box-shadow,transform] duration-150",
        "hover:shadow-3 hover:-translate-y-0.5 pop:hover:[transform:translate(-2px,-2px)]",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export const CardMedia = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid h-26 place-items-center border-b-solid [border-bottom-width:var(--line-w)] [border-color:var(--card-line-color)]",
        "bg-accent-soft text-faint",
        className,
      )}
      {...props}
    />
  ),
);
CardMedia.displayName = "CardMedia";

export const CardBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 p-5", className)} {...props} />
  ),
);
CardBody.displayName = "CardBody";

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-base tracking-[-0.01em] [font-weight:var(--font-weight-strong)]",
        className,
      )}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

export const CardText = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-[13px] leading-relaxed text-muted", className)} {...props} />
));
CardText.displayName = "CardText";

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex justify-end gap-2 border-t-solid [border-top-width:var(--line-w)] [border-color:var(--card-line-color)]",
        "bg-bg px-5 py-3.5",
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";
