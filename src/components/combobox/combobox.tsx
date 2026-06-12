import { forwardRef, useId, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { useClickOutside } from "../../lib/use-click-outside";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-3" aria-hidden="true">
    <path
      d="M20 6 9 17l-5-5"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Combobox — a multi-select dropdown with chips and checkable options. */
export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options,
      value,
      defaultValue = [],
      onValueChange,
      placeholder = "Select…",
      disabled,
      className,
      "aria-label": ariaLabel = "Multi-select",
    },
    ref,
  ) => {
    const [internal, setInternal] = useState(defaultValue);
    const selected = value ?? internal;
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);
    const listId = useId();

    useClickOutside(wrapRef, () => setOpen(false), open);

    const set = (next: string[]) => {
      if (value === undefined) setInternal(next);
      onValueChange?.(next);
    };

    const toggle = (val: string) =>
      set(selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val]);

    const chosen = options.filter((o) => selected.includes(o.value));

    return (
      <div ref={mergeRefs(ref, wrapRef)} className={cn("relative max-w-[360px]", className)}>
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={ariaLabel}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "flex min-h-[44px] w-full cursor-pointer flex-wrap items-center gap-1.5 rounded-sm bg-surface py-1.5 pe-9 ps-2.5 text-start",
            "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
            open && "border-accent shadow-[0_0_0_3px_var(--accent-soft)]",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {chosen.length === 0 && <span className="text-sm text-faint">{placeholder}</span>}
          {chosen.map((o) => (
            <span
              key={o.value}
              className="inline-flex items-center gap-1.5 rounded-sm bg-accent-soft py-[3px] pe-1 ps-2.5 text-[13px] font-semibold text-fg pebble:rounded-full"
            >
              {o.label}
              <span
                role="button"
                tabIndex={-1}
                aria-label={`Remove ${o.label}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(o.value);
                }}
                className="grid size-[17px] place-items-center rounded-full text-muted hover:bg-danger-soft hover:text-danger"
              >
                ✕
              </span>
            </span>
          ))}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute end-3.5 top-1/2 size-2 -translate-y-1/2 rotate-45 border-b-2 border-e-2 border-muted transition-transform",
              open && "-translate-y-1/4 rotate-[225deg]",
            )}
          />
        </button>
        {open && (
          <div
            id={listId}
            role="listbox"
            aria-multiselectable
            className={cn(
              "absolute inset-x-0 top-[calc(100%+6px)] z-20 max-h-[250px] overflow-y-auto rounded-sm bg-surface p-1 shadow-3",
              "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
            )}
          >
            {options.map((o) => {
              const isSel = selected.includes(o.value);
              return (
                <button
                  key={o.value}
                  type="button"
                  role="option"
                  aria-selected={isSel}
                  onClick={() => toggle(o.value)}
                  className="flex w-full items-center gap-2.5 rounded-[calc(var(--r-sm)-2px)] px-3 py-2 text-left text-sm text-fg hover:bg-accent-soft"
                >
                  <span
                    className={cn(
                      "grid size-[18px] flex-none place-items-center rounded-sm text-accent-fg",
                      "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
                      isSel && "bg-accent border-accent",
                    )}
                  >
                    {isSel && <Check />}
                  </span>
                  {o.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);
Combobox.displayName = "Combobox";

// Small ref merge so the component can expose its DOM node and track outside clicks.
function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref && typeof ref === "object")
        (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}
