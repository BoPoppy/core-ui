import { forwardRef, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn";

export interface OTPInputProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called when every slot is filled. */
  onComplete?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

/**
 * OTPInput — a one-time-code field. Auto-advances on entry, steps back on
 * Backspace, and fills all slots from a single paste.
 */
export const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
  (
    {
      length = 6,
      value,
      defaultValue = "",
      onValueChange,
      onComplete,
      disabled,
      className,
      "aria-label": ariaLabel = "One-time code",
    },
    ref,
  ) => {
    const [internal, setInternal] = useState(defaultValue);
    const code = (value ?? internal).slice(0, length);
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    const chars = useMemo(() => Array.from({ length }, (_, i) => code[i] ?? ""), [code, length]);

    const commit = (next: string) => {
      const clean = next.slice(0, length);
      if (value === undefined) setInternal(clean);
      onValueChange?.(clean);
      if (clean.length === length) onComplete?.(clean);
    };

    const setChar = (index: number, char: string) => {
      const arr = chars.slice();
      arr[index] = char;
      commit(arr.join(""));
    };

    const focusAt = (i: number) => inputs.current[i]?.focus();

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        className={cn("flex w-full gap-2", className)}
        style={{ maxWidth: `${length * 46 + (length - 1) * 8}px` }}
      >
        {chars.map((char, i) => (
          <input
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            disabled={disabled}
            value={char}
            aria-label={`Digit ${i + 1}`}
            onChange={(e) => {
              const digit = e.target.value.replace(/\D/g, "").slice(-1);
              setChar(i, digit);
              if (digit && i < length - 1) focusAt(i + 1);
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                if (!chars[i] && i > 0) {
                  focusAt(i - 1);
                  setChar(i - 1, "");
                } else {
                  setChar(i, "");
                }
              } else if (e.key === "ArrowLeft" && i > 0) {
                focusAt(i - 1);
              } else if (e.key === "ArrowRight" && i < length - 1) {
                focusAt(i + 1);
              }
            }}
            onPaste={(e) => {
              e.preventDefault();
              const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
              if (pasted) {
                commit(pasted);
                focusAt(Math.min(pasted.length, length - 1));
              }
            }}
            className={cn(
              "h-[54px] w-full max-w-[46px] min-w-0 flex-1 rounded-sm bg-surface text-center text-[22px] font-bold text-fg outline-none",
              "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
              "transition-[border-color,box-shadow,background-color]",
              "focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]",
              char && "border-accent bg-accent-soft",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          />
        ))}
      </div>
    );
  },
);
OTPInput.displayName = "OTPInput";
