import type { ReactNode } from "react";
import { cn } from "./cn";

export interface FieldChromeProps {
  /** Visible field label. */
  label?: string;
  /** Helper text below the control. */
  hint?: string;
  /** Control id, for a `<label htmlFor>` association (labelable controls only). */
  htmlFor?: string;
  /** id applied to the label, for `aria-labelledby` on non-labelable controls. */
  labelId?: string;
  /** id applied to the hint, for `aria-describedby`. */
  hintId?: string;
  /** Extra classes for the wrapping field column. */
  className?: string;
  children: ReactNode;
}

/**
 * Shared label + hint chrome for labelled form controls — matches the design's
 * `.field` / `.field-label` / `.field-hint`. When neither `label` nor `hint` is
 * set it renders the control bare, so the chrome is opt-in and non-breaking.
 */
export function FieldChrome({
  label,
  hint,
  htmlFor,
  labelId,
  hintId,
  className,
  children,
}: FieldChromeProps) {
  if (!label && !hint) return <>{children}</>;

  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      {label && (
        <label id={labelId} htmlFor={htmlFor} className="text-[13px] font-semibold text-fg">
          {label}
        </label>
      )}
      {children}
      {hint && (
        <span id={hintId} className="text-xs text-muted">
          {hint}
        </span>
      )}
    </div>
  );
}
