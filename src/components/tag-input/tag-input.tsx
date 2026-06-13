import { forwardRef, useId, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { FieldChrome } from "../../lib/field-chrome";

export interface TagInputProps {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (tags: string[]) => void;
  placeholder?: string;
  /** Prevent duplicate tags (case-insensitive). Defaults to true. */
  dedupe?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  /** Visible field label, wired to the input via `htmlFor`/`id`. */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  "aria-label"?: string;
}

/**
 * TagInput — type and press Enter or comma to add a chip; Backspace on an empty
 * field removes the last one.
 */
export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      value,
      defaultValue = [],
      onValueChange,
      placeholder = "Add tags…",
      dedupe = true,
      disabled,
      className,
      id,
      label,
      hint,
      "aria-label": ariaLabel = "Tags",
    },
    ref,
  ) => {
    const [internal, setInternal] = useState(defaultValue);
    const [draft, setDraft] = useState("");
    const tags = value ?? internal;
    const wrapRef = useRef<HTMLDivElement>(null);
    const autoId = useId();
    const fieldId = id ?? autoId;
    const hintId = `${fieldId}-hint`;

    const commit = (next: string[]) => {
      if (value === undefined) setInternal(next);
      onValueChange?.(next);
    };

    const add = (raw: string) => {
      const tag = raw.trim();
      if (!tag) return;
      if (dedupe && tags.some((t) => t.toLowerCase() === tag.toLowerCase())) return;
      commit([...tags, tag]);
    };

    const removeAt = (i: number) => commit(tags.filter((_, idx) => idx !== i));

    return (
      <FieldChrome label={label} hint={hint} htmlFor={fieldId} hintId={hintId}>
        <div
          ref={wrapRef}
          onClick={() => wrapRef.current?.querySelector("input")?.focus()}
          className={cn(
            "flex min-h-[44px] max-w-[430px] cursor-text flex-wrap items-center gap-1.5 rounded-sm bg-surface px-2.5 py-[7px]",
            "border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
            "focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--accent-soft)]",
            disabled && "opacity-60",
            className,
          )}
        >
          {tags.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="inline-flex items-center gap-1.5 rounded-sm bg-accent-soft py-[3px] pe-1 ps-2.5 text-[13px] font-semibold text-fg pebble:rounded-full"
            >
              {tag}
              <button
                type="button"
                aria-label={`Remove ${tag}`}
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  removeAt(i);
                }}
                className="grid size-[17px] place-items-center rounded-full text-muted hover:bg-danger-soft hover:text-danger"
              >
                ✕
              </button>
            </span>
          ))}
          <input
            ref={ref}
            id={fieldId}
            value={draft}
            disabled={disabled}
            placeholder={placeholder}
            aria-label={label ? undefined : ariaLabel}
            aria-describedby={hint ? hintId : undefined}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                add(draft);
                setDraft("");
              } else if (e.key === "Backspace" && !draft && tags.length) {
                removeAt(tags.length - 1);
              }
            }}
            onBlur={() => {
              if (draft.trim()) {
                add(draft);
                setDraft("");
              }
            }}
            // The wrapper shows the focus ring; suppress the global
            // :focus-visible box-shadow so the inner input doesn't draw its own.
            className="h-7 min-w-[90px] flex-1 border-none bg-transparent text-sm text-fg outline-none placeholder:text-faint focus-visible:shadow-none"
          />
        </div>
      </FieldChrome>
    );
  },
);
TagInput.displayName = "TagInput";
