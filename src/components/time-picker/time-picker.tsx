import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn";

export interface TimeValue {
  hour: number; // 1–12
  minute: number; // 0–59
  period: "AM" | "PM";
}

export interface TimePickerProps {
  value?: TimeValue;
  defaultValue?: TimeValue;
  onValueChange?: (value: TimeValue) => void;
  /** Minute step for the steppers. */
  minuteStep?: number;
  disabled?: boolean;
  className?: string;
}

const DEFAULT: TimeValue = { hour: 12, minute: 0, period: "AM" };
const pad = (n: number) => n.toString().padStart(2, "0");

function Segment({
  value,
  label,
  onStep,
  onSet,
}: {
  value: string;
  label: string;
  onStep: (delta: number) => void;
  onSet: (raw: string) => void;
}) {
  return (
    <input
      aria-label={label}
      value={value}
      inputMode="numeric"
      onChange={(e) => onSet(e.target.value.replace(/\D/g, ""))}
      onKeyDown={(e) => {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          onStep(1);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          onStep(-1);
        }
      }}
      className="w-7 bg-transparent text-center text-[15px] font-semibold text-fg outline-none"
    />
  );
}

/** TimePicker — segmented 12-hour time entry with AM/PM toggle. */
export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  ({ value, defaultValue = DEFAULT, onValueChange, minuteStep = 1, disabled, className }, ref) => {
    const [internal, setInternal] = useState(defaultValue);
    const time = value ?? internal;

    const set = (next: TimeValue) => {
      if (value === undefined) setInternal(next);
      onValueChange?.(next);
    };

    const setHour = (h: number) => set({ ...time, hour: ((((h - 1) % 12) + 12) % 12) + 1 });
    const setMinute = (m: number) => set({ ...time, minute: ((m % 60) + 60) % 60 });

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex h-[42px] items-center gap-0.5 rounded-sm bg-surface px-3 text-fg",
          "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
          "focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--accent-soft)]",
          disabled && "pointer-events-none opacity-60",
          className,
        )}
      >
        <Segment
          label="Hour"
          value={pad(time.hour)}
          onStep={(d) => setHour(time.hour + d)}
          onSet={(raw) => setHour(Number(raw) || 12)}
        />
        <span className="font-semibold text-muted">:</span>
        <Segment
          label="Minute"
          value={pad(time.minute)}
          onStep={(d) => setMinute(time.minute + d * minuteStep)}
          onSet={(raw) => setMinute(Math.min(59, Number(raw) || 0))}
        />
        <button
          type="button"
          aria-label="Toggle AM/PM"
          onClick={() => set({ ...time, period: time.period === "AM" ? "PM" : "AM" })}
          className="ms-1.5 rounded-[calc(var(--r-sm)-2px)] bg-surface-2 px-2 py-1 text-[13px] font-bold text-fg hover:bg-accent-soft"
        >
          {time.period}
        </button>
      </div>
    );
  },
);
TimePicker.displayName = "TimePicker";
