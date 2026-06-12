import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn";

export interface NumberFieldProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
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
      "aria-label": ariaLabel,
    },
    ref,
  ) => {
    const [internal, setInternal] = useState(defaultValue);
    const current = value ?? internal;

    const set = (next: number) => {
      const clamped = Math.min(max, Math.max(min, next));
      if (value === undefined) setInternal(clamped);
      onValueChange?.(clamped);
    };

    return (
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
          type="number"
          inputMode="numeric"
          aria-label={ariaLabel}
          value={current}
          min={min === Number.NEGATIVE_INFINITY ? undefined : min}
          max={max === Number.POSITIVE_INFINITY ? undefined : max}
          step={step}
          disabled={disabled}
          onChange={(e) => set(Number(e.target.value))}
          className="w-[60px] border-none bg-transparent text-center text-[15px] font-semibold text-fg outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
    );
  },
);
NumberField.displayName = "NumberField";
