import { forwardRef, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { useClickOutside } from "../../lib/use-click-outside";

export interface SpeedDialAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export interface SpeedDialProps {
  actions: SpeedDialAction[];
  /** Icon for the main trigger (rotates 45° when open). */
  icon?: React.ReactNode;
  direction?: "up" | "down";
  className?: string;
  "aria-label"?: string;
}

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/** SpeedDial — a FAB that fans out a set of actions. */
export const SpeedDial = forwardRef<HTMLDivElement, SpeedDialProps>(
  ({ actions, icon, direction = "up", className, "aria-label": ariaLabel = "Actions" }, ref) => {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);
    useClickOutside(wrapRef, () => setOpen(false), open);

    return (
      <div
        ref={mergeRefs(ref, wrapRef)}
        className={cn("relative inline-flex w-14 flex-col items-center", className)}
      >
        <div
          className={cn(
            "absolute flex items-center gap-3",
            direction === "up" ? "bottom-full mb-3 flex-col-reverse" : "top-full mt-3 flex-col",
          )}
        >
          {open &&
            actions.map((action, i) => (
              <button
                key={action.label}
                type="button"
                aria-label={action.label}
                style={{ transitionDelay: `${i * 40}ms` }}
                onClick={() => {
                  action.onClick();
                  setOpen(false);
                }}
                className={cn(
                  "grid size-10 place-items-center rounded-full bg-surface text-fg shadow-2 transition-all [&_svg]:size-[18px]",
                  "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
                  "animate-[fv-fade-in_180ms_ease] hover:bg-accent-soft",
                )}
              >
                {action.icon}
              </button>
            ))}
        </div>
        <button
          type="button"
          aria-label={ariaLabel}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "grid size-14 place-items-center rounded-full bg-accent text-accent-fg shadow-2 transition-transform duration-200",
            "border-solid [border-width:var(--line-w)] border-transparent pop:border-fg pop:rounded-[18px]",
            open && "rotate-45",
          )}
        >
          {icon ?? <PlusIcon />}
        </button>
      </div>
    );
  },
);
SpeedDial.displayName = "SpeedDial";

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref && typeof ref === "object")
        (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}
