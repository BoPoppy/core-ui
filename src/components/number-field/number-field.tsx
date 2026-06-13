import { forwardRef, useId, useState } from "react";
import { cn } from "../../lib/cn";
import { FieldChrome } from "../../lib/field-chrome";

export interface NumberFieldProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  id?: string;
  /** Visible field label, wired to the input via `htmlFor`/`id`. */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  "aria-label"?: string;
}

const btn =
  "grid w-[38px] place-items-center bg-surface-2 text-fg text-lg cursor-pointer transition-colors hover:bg-accent-soft active:bg-accent active:text-accent-fg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface-2";

/** NumberField — a numeric input with stepper buttons, clamping, and step. */
export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      value,
      defaultValue = 0,
      onValueChange,
      min = Number.NEGATIVE_INFINITY,
      max = Number.POSITIVE_INFINITY,
      step = 1,
      disabled,
      className,
      id,
      label,
      hint,
      "aria-label": ariaLabel,
    },
    ref,
  ) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const hintId = `${fieldId}-hint`;
    const [internal, setInternal] = useState(defaultValue);
    const current = value ?? internal;

    const set = (next: number) => {
      const clamped = Math.min(max, Math.max(min, next));
      if (value === undefined) setInternal(clamped);
      onValueChange?.(clamped);
    };

    return (
      <FieldChrome label={label} hint={hint} htmlFor={fieldId} hintId={hintId}>
        <div
          className={cn(
            "inline-flex h-[42px] items-stretch overflow-hidden rounded-sm bg-surface",
            "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
            "focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--accent-soft)]",
            disabled && "opacity-60",
            className,
          )}
        >
          <button
            type="button"
            aria-label="Decrement"
            className={btn}
            disabled={disabled || current <= min}
            onClick={() => set(current - step)}
          >
            −
          </button>
          <input
            ref={ref}
            id={fieldId}
            type="number"
            inputMode="numeric"
            aria-label={label ? undefined : ariaLabel}
            aria-describedby={hint ? hintId : undefined}
            value={current}
            min={min === Number.NEGATIVE_INFINITY ? undefined : min}
            max={max === Number.POSITIVE_INFINITY ? undefined : max}
            step={step}
            disabled={disabled}
            onChange={(e) => set(Number(e.target.value))}
            // The wrapper shows the focus ring; suppress the global
            // :focus-visible box-shadow so the inner input doesn't draw its own.
            className="w-[60px] border-none bg-transparent text-center text-[15px] font-semibold text-fg outline-none focus-visible:shadow-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            aria-label="Increment"
            className={btn}
            disabled={disabled || current >= max}
            onClick={() => set(current + step)}
          >
            +
          </button>
        </div>
      </FieldChrome>
    );
  },
);
NumberField.displayName = "NumberField";
