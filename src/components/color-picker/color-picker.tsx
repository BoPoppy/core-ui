import { forwardRef, useRef, useState } from "react";
import { cn } from "../../lib/cn";

const SWATCHES = [
  "#18181b",
  "#71717a",
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
];

const HEX_RE = /^#?([0-9a-f]{6})$/i;

function hslToHex(h: number, s: number, l: number) {
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function normalizeHex(input: string): string | null {
  const group = input.match(HEX_RE)?.[1];
  return group ? `#${group.toLowerCase()}` : null;
}

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (hex: string) => void;
  /** Override the swatch palette. */
  swatches?: string[];
  className?: string;
}

/**
 * ColorPicker — three ways to choose a color, kept in sync: click a swatch,
 * drag the hue track, or type a hex value.
 */
export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ value, defaultValue = "#6366f1", onValueChange, swatches = SWATCHES, className }, ref) => {
    const [internal, setInternal] = useState(defaultValue);
    const color = (value ?? internal).toLowerCase();
    const [draft, setDraft] = useState<string | null>(null);
    const hueRef = useRef<HTMLDivElement>(null);

    const apply = (hex: string) => {
      const norm = normalizeHex(hex);
      if (!norm) return;
      if (value === undefined) setInternal(norm);
      onValueChange?.(norm);
    };

    const hueFromPointer = (clientX: number) => {
      const el = hueRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const frac = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      apply(hslToHex(Math.round(frac * 360), 70, 60));
    };

    const draftValue = draft ?? color.replace("#", "").toUpperCase();
    const draftValid = normalizeHex(draftValue) !== null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex max-w-[300px] flex-col gap-4 rounded-md bg-surface p-4",
          "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
          className,
        )}
      >
        {/* preview + hex input */}
        <div className="flex items-center gap-3">
          <span
            className="size-12 flex-none rounded-sm pebble:rounded-[14px] shadow-1 border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg"
            style={{ backgroundColor: color }}
          />
          <div className="flex items-center gap-1">
            <span className="font-mono text-[15px] font-bold text-muted">#</span>
            <input
              value={draftValue}
              aria-label="Hex color"
              maxLength={6}
              onChange={(e) => setDraft(e.target.value.replace(/[^0-9a-fA-F]/g, ""))}
              onBlur={() => {
                if (draft != null) apply(`#${draft}`);
                setDraft(null);
              }}
              className={cn(
                "w-[90px] rounded-sm bg-surface-2 px-2 py-1 font-mono text-[15px] font-bold uppercase text-fg outline-none",
                "border-solid [border-width:var(--line-w)] border-transparent focus:border-accent",
                !draftValid && "border-danger! text-danger",
              )}
            />
          </div>
        </div>

        {/* hue track — an enhancement; the hex input and swatches are the labelled controls */}
        <div
          ref={hueRef}
          className="relative h-3.5 cursor-pointer rounded-full"
          style={{
            background:
              "linear-gradient(90deg,#f87171,#fbbf24,#4ade80,#22d3ee,#60a5fa,#a78bfa,#f472b6,#f87171)",
          }}
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            hueFromPointer(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.buttons === 1) hueFromPointer(e.clientX);
          }}
        />

        {/* swatches */}
        <div className="grid grid-cols-8 gap-[7px]">
          {swatches.map((s) => (
            <button
              key={s}
              type="button"
              aria-label={s}
              aria-pressed={s.toLowerCase() === color}
              onClick={() => apply(s)}
              className={cn(
                "grid aspect-square place-items-center rounded-sm pebble:rounded-full transition-transform hover:scale-110",
                "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
                s.toLowerCase() === color && "ring-2 ring-accent ring-offset-1 ring-offset-surface",
              )}
              style={{ backgroundColor: s }}
            >
              {s.toLowerCase() === color && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-3.5 text-white mix-blend-difference"
                  aria-hidden="true"
                >
                  <path
                    d="M20 6 9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  },
);
ColorPicker.displayName = "ColorPicker";
