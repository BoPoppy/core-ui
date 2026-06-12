import { forwardRef, useId, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { useClickOutside } from "../../lib/use-click-outside";

export interface AutocompleteProps {
  options: string[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

/**
 * Autocomplete — a single-select combobox. Type to filter; ↑/↓ to move, Enter
 * to choose. Closes on outside click or Escape.
 */
export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      options,
      value,
      defaultValue = "",
      onValueChange,
      placeholder = "Search…",
      emptyMessage = "No matches",
      disabled,
      className,
      "aria-label": ariaLabel = "Autocomplete",
    },
    ref,
  ) => {
    const [internal, setInternal] = useState(defaultValue);
    const text = value ?? internal;
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const wrapRef = useRef<HTMLDivElement>(null);
    const listId = useId();

    useClickOutside(wrapRef, () => setOpen(false), open);

    const filtered = useMemo(() => {
      const q = text.trim().toLowerCase();
      return q ? options.filter((o) => o.toLowerCase().includes(q)) : options;
    }, [options, text]);

    const set = (next: string) => {
      if (value === undefined) setInternal(next);
      onValueChange?.(next);
    };

    const choose = (option: string) => {
      set(option);
      setOpen(false);
    };

    return (
      <div ref={wrapRef} className={cn("relative max-w-[340px]", className)}>
        <input
          ref={ref}
          value={text}
          disabled={disabled}
          placeholder={placeholder}
          role="combobox"
          aria-label={ariaLabel}
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          onChange={(e) => {
            set(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
              setActive((a) => Math.min(filtered.length - 1, a + 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(0, a - 1));
            } else if (e.key === "Enter" && open && filtered[active]) {
              e.preventDefault();
              choose(filtered[active]);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          className={cn(
            "h-[42px] w-full rounded-sm bg-surface px-3.5 text-sm text-fg outline-none",
            "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
            "placeholder:text-faint focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        />
        {open && (
          <div
            id={listId}
            role="listbox"
            className={cn(
              "absolute inset-x-0 top-[calc(100%+6px)] z-20 max-h-60 overflow-y-auto rounded-sm bg-surface p-1 shadow-3",
              "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
            )}
          >
            {filtered.length === 0 && (
              <div className="px-3 py-2.5 text-center text-[13px] text-faint">{emptyMessage}</div>
            )}
            {filtered.map((option, i) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={option === text}
                onMouseMove={() => setActive(i)}
                onClick={() => choose(option)}
                className={cn(
                  "flex w-full items-center rounded-[calc(var(--r-sm)-2px)] px-3 py-2 text-left text-sm text-fg",
                  i === active && "bg-accent-soft",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
Autocomplete.displayName = "Autocomplete";
