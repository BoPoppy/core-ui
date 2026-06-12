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

function sameDay(a: Date | undefined, b: Date) {
  return (
    !!a &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export interface CalendarProps {
  value?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

const NavBtn = ({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className="grid size-[30px] place-items-center rounded-sm bg-surface text-muted pebble:rounded-full border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg hover:border-accent hover:bg-accent-soft hover:text-fg"
  >
    {children}
  </button>
);

/** Calendar — a month grid with selection, today marker, and month nav. */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ value, onSelect, className }, ref) => {
    const today = new Date();
    const [view, setView] = useState(() => {
      const base = value ?? today;
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
        <div className="grid grid-cols-7 gap-0.5">
          {DOW.map((d) => (
            <div key={d} className="py-1.5 text-center text-[11px] font-bold uppercase text-faint">
              {d}
            </div>
          ))}
          {cells.map((date, i) => {
            if (!date) return <div key={`e-${i}`} />;
            const selected = sameDay(value, date);
            const isToday = sameDay(today, date);
            return (
              <button
                key={date.toISOString()}
                type="button"
                aria-pressed={selected}
                aria-label={date.toDateString()}
                onClick={() => onSelect?.(date)}
                className={cn(
                  "grid aspect-square place-items-center rounded-sm pebble:rounded-full text-[13px] font-semibold text-fg",
                  "border-solid border-[length:var(--line-w)] border-transparent transition-colors hover:bg-accent-soft",
                  isToday && !selected && "border-accent text-accent",
                  selected && "bg-accent text-accent-fg border-accent pop:border-fg",
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
Calendar.displayName = "Calendar";

export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** Format the selected date for display. Defaults to locale date string. */
  format?: (date: Date) => string;
  "aria-label"?: string;
}

/** DatePicker — a text trigger that opens a Calendar in a popover. */
export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      placeholder = "Pick a date",
      disabled,
      className,
      format = (d) => d.toLocaleDateString(),
      "aria-label": ariaLabel = "Pick a date",
    },
    ref,
  ) => {
    const [internal, setInternal] = useState<Date | undefined>(defaultValue);
    const [open, setOpen] = useState(false);
    const selected = value ?? internal;

    const select = (date: Date) => {
      if (value === undefined) setInternal(date);
      onValueChange?.(date);
      setOpen(false);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            aria-label={ariaLabel}
            className={cn(
              "inline-flex h-[42px] w-[220px] items-center gap-2.5 rounded-sm bg-surface px-3.5 text-sm text-fg outline-none",
              "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
              "transition-[border-color,box-shadow] hover:border-accent data-[state=open]:border-accent data-[state=open]:shadow-[0_0_0_3px_var(--accent-soft)]",
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
            <span className={cn("flex-1 text-start", !selected && "text-faint")}>
              {selected ? format(selected) : placeholder}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar value={selected} onSelect={select} />
        </PopoverContent>
      </Popover>
    );
  },
);
DatePicker.displayName = "DatePicker";
