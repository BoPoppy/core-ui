import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";

const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface DateRange {
  start?: Date;
  end?: Date;
}

const dayValue = (d: Date) => d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate();
const sameDay = (a: Date | undefined, b: Date) => !!a && dayValue(a) === dayValue(b);

export interface RangeCalendarProps {
  value?: DateRange;
  onValueChange?: (range: DateRange) => void;
  className?: string;
}

const NavBtn = ({
  label,
  onClick,
  children,
}: { label: string; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className="grid size-[30px] place-items-center rounded-sm bg-surface text-muted pebble:rounded-full border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg hover:border-accent hover:bg-accent-soft hover:text-fg"
  >
    {children}
  </button>
);

/** RangeCalendar — a month grid that selects a start→end date range. */
export const RangeCalendar = forwardRef<HTMLDivElement, RangeCalendarProps>(
  ({ value = {}, onValueChange, className }, ref) => {
    const today = new Date();
    const [view, setView] = useState(() => {
      const base = value.start ?? today;
      return { year: base.getFullYear(), month: base.getMonth() };
    });

    const firstDay = new Date(view.year, view.month, 1).getDay();
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.year, view.month, d));

    const shift = (delta: number) => {
      const m = view.month + delta;
      setView({ year: view.year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 });
    };

    const pick = (date: Date) => {
      const { start, end } = value;
      if (!start || end) onValueChange?.({ start: date, end: undefined });
      else if (dayValue(date) < dayValue(start)) onValueChange?.({ start: date, end: start });
      else onValueChange?.({ start, end: date });
    };

    const inRange = (d: Date) =>
      value.start &&
      value.end &&
      dayValue(d) > dayValue(value.start) &&
      dayValue(d) < dayValue(value.end);

    return (
      <div ref={ref} className={cn("w-[280px] p-4", className)}>
        <div className="mb-3.5 flex items-center justify-between">
          <NavBtn label="Previous month" onClick={() => shift(-1)}>
            ‹
          </NavBtn>
          <span className="text-[15px] [font-weight:var(--font-weight-strong)] text-fg">
            {MONTHS[view.month]} {view.year}
          </span>
          <NavBtn label="Next month" onClick={() => shift(1)}>
            ›
          </NavBtn>
        </div>
        <div className="grid grid-cols-7 gap-y-0.5">
          {DOW.map((d) => (
            <div key={d} className="py-1.5 text-center text-[11px] font-bold uppercase text-faint">
              {d}
            </div>
          ))}
          {cells.map((date, i) => {
            if (!date) return <div key={`e-${i}`} />;
            const isStart = sameDay(value.start, date);
            const isEnd = sameDay(value.end, date);
            const edge = isStart || isEnd;
            const mid = inRange(date);
            return (
              <button
                key={dayValue(date)}
                type="button"
                aria-label={date.toDateString()}
                onClick={() => pick(date)}
                className={cn(
                  "grid aspect-square place-items-center text-[13px] font-semibold text-fg transition-colors",
                  mid && "bg-accent-soft",
                  isStart && value.end && "rounded-s-full bg-accent-soft",
                  isEnd && "rounded-e-full bg-accent-soft",
                  !edge && !mid && "rounded-sm pebble:rounded-full hover:bg-accent-soft",
                  edge && "rounded-full bg-accent! text-accent-fg",
                )}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);
RangeCalendar.displayName = "RangeCalendar";

export interface DateRangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  format?: (date: Date) => string;
}

/** DateRangePicker — a trigger that opens a RangeCalendar in a popover. */
export const DateRangePicker = forwardRef<HTMLButtonElement, DateRangePickerProps>(
  (
    {
      value,
      defaultValue = {},
      onValueChange,
      placeholder = "Pick a date range",
      disabled,
      className,
      format = (d) => d.toLocaleDateString(),
    },
    ref,
  ) => {
    const [internal, setInternal] = useState<DateRange>(defaultValue);
    const [open, setOpen] = useState(false);
    const range = value ?? internal;

    const change = (next: DateRange) => {
      if (value === undefined) setInternal(next);
      onValueChange?.(next);
      if (next.start && next.end) setOpen(false);
    };

    const label =
      range.start && range.end
        ? `${format(range.start)} – ${format(range.end)}`
        : range.start
          ? `${format(range.start)} – …`
          : placeholder;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            aria-label={placeholder}
            className={cn(
              "inline-flex h-[42px] w-[260px] items-center gap-2.5 rounded-sm bg-surface px-3.5 text-sm text-fg outline-none",
              "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
              "hover:border-accent data-[state=open]:border-accent data-[state=open]:shadow-[0_0_0_3px_var(--accent-soft)]",
              "disabled:cursor-not-allowed disabled:opacity-60",
              className,
            )}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className="size-4 flex-none text-muted"
            >
              <path
                d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={cn("flex-1 text-start", !range.start && "text-faint")}>{label}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <RangeCalendar value={range} onValueChange={change} />
        </PopoverContent>
      </Popover>
    );
  },
);
DateRangePicker.displayName = "DateRangePicker";
