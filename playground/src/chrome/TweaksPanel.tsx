import { type Density, useTheme } from "@bopoppy/core-ui";
import { useState } from "react";

const ACCENTS: { name: string; value?: string }[] = [
  { name: "Ink (default)", value: undefined },
  { name: "Indigo", value: "#6366f1" },
  { name: "Emerald", value: "#10b981" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Sky", value: "#0ea5e9" },
];

const DENSITIES: Density[] = ["compact", "regular", "comfy"];

/** Floating runtime Tweaks panel — writes accent / radius / density overrides
 *  through the ThemeProvider, exactly like the design's Tweaks panel. */
export function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const { accent, setAccent, radiusScale, setRadiusScale, density, setDensity } = useTheme();

  if (!open) {
    return (
      <button className="tweaks-fab" type="button" onClick={() => setOpen(true)}>
        ✦ Tweaks
      </button>
    );
  }

  return (
    <div className="tweaks-panel" role="dialog" aria-label="Runtime tweaks">
      <div className="tweaks-head">
        <span className="tweaks-title">Tweaks</span>
        <button
          className="tweaks-close"
          type="button"
          aria-label="Close tweaks"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
      </div>

      <div className="tweaks-row">
        <div className="tweaks-label">Accent</div>
        <div className="accent-swatches">
          {ACCENTS.map((a) => (
            <button
              key={a.name}
              className="accent-sw"
              type="button"
              title={a.name}
              aria-label={a.name}
              aria-pressed={accent === a.value}
              style={{ background: a.value ?? "var(--text)" }}
              onClick={() => setAccent(a.value)}
            />
          ))}
        </div>
      </div>

      <div className="tweaks-row">
        <div className="tweaks-label">
          <span>Radius</span>
          <span className="val">{radiusScale.toFixed(2)}×</span>
        </div>
        <input
          className="tweaks-range"
          type="range"
          min={0}
          max={2}
          step={0.05}
          value={radiusScale}
          onChange={(e) => setRadiusScale(Number(e.target.value))}
        />
      </div>

      <div className="tweaks-row">
        <div className="tweaks-label">Density</div>
        <div className="seg">
          {DENSITIES.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={density === d}
              onClick={() => setDensity(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
