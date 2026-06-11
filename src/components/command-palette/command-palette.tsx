import * as RadixDialog from "@radix-ui/react-dialog";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn";

export interface CommandItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: React.ReactNode;
  group?: string;
  /** Extra terms to match against the query. */
  keywords?: string[];
  onSelect: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
}

/**
 * CommandPalette — a ⌘K-style searchable command menu. Built on Radix Dialog
 * (focus trap, Esc, scrim). Filter as you type; ↑/↓ to move, Enter to run.
 * Use the `useCommandPaletteShortcut` hook to bind ⌘K/Ctrl-K globally.
 */
export function CommandPalette({
  open,
  onOpenChange,
  items,
  placeholder = "Type a command or search…",
  emptyMessage = "No results found.",
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      [item.label, ...(item.keywords ?? [])].join(" ").toLowerCase().includes(q),
    );
  }, [items, query]);

  // Reset and focus the input whenever the palette re-opens.
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      // Focus after Radix has mounted/positioned the content.
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const groups = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const item of filtered) {
      const key = item.group ?? "";
      const list = map.get(key) ?? [];
      list.push(item);
      map.set(key, list);
    }
    return [...map.entries()];
  }, [filtered]);

  const run = (item: CommandItem) => {
    item.onSelect();
    onOpenChange(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(filtered.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[active];
      if (item) run(item);
    }
  };

  let flatIndex = -1;

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] data-[state=open]:animate-[fv-overlay-in_200ms_ease]" />
        <RadixDialog.Content
          aria-label="Command palette"
          onKeyDown={onKeyDown}
          className={cn(
            "fixed left-1/2 top-[15vh] z-50 w-full max-w-[520px] -translate-x-1/2 overflow-hidden rounded-md bg-surface shadow-3 outline-none",
            "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
            "data-[state=open]:animate-[fv-dialog-in_180ms_ease]",
          )}
        >
          <RadixDialog.Title className="sr-only">Command palette</RadixDialog.Title>
          <div className="flex items-center gap-3 border-b-solid [border-bottom-width:var(--line-w)] border-border px-[18px] py-3.5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="size-[18px] flex-none text-muted"
            >
              <path
                d="M21 21l-4.3-4.3M11 18a7 7 0 100-14 7 7 0 000 14z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              role="combobox"
              aria-expanded
              aria-controls={listId}
              aria-activedescendant={
                filtered[active] ? `${listId}-${filtered[active].id}` : undefined
              }
              className="flex-1 border-none bg-transparent text-base text-fg outline-none placeholder:text-faint"
            />
            <kbd className="rounded-[6px] border-solid [border-width:var(--line-w)] border-border-strong px-1.5 py-0.5 text-[11px] font-bold text-faint">
              ESC
            </kbd>
          </div>

          <div id={listId} role="listbox" className="max-h-[300px] overflow-y-auto p-2">
            {filtered.length === 0 && (
              <div className="px-3 py-8 text-center text-sm text-faint">{emptyMessage}</div>
            )}
            {groups.map(([group, groupItems]) => (
              <div key={group || "_"}>
                {group && (
                  <div className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.06em] text-faint">
                    {group}
                  </div>
                )}
                {groupItems.map((item) => {
                  flatIndex += 1;
                  const isActive = flatIndex === active;
                  const idx = flatIndex;
                  return (
                    <button
                      key={item.id}
                      id={`${listId}-${item.id}`}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onMouseMove={() => setActive(idx)}
                      onClick={() => run(item)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left text-sm text-fg",
                        isActive && "bg-accent-soft",
                      )}
                    >
                      {item.icon && (
                        <span
                          className={cn(
                            "grid size-[30px] flex-none place-items-center rounded-sm pebble:rounded-lg bg-surface-2 text-muted [&_svg]:size-4",
                            isActive && "bg-accent text-accent-fg",
                          )}
                        >
                          {item.icon}
                        </span>
                      )}
                      <span className="flex-1">{item.label}</span>
                      {item.shortcut && (
                        <span className="font-mono text-[11px] text-faint">{item.shortcut}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

/** Binds ⌘K / Ctrl-K to toggle the palette. */
export function useCommandPaletteShortcut(onToggle: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onToggle();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onToggle]);
}
