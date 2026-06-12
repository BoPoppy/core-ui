import { Grp, Section } from "../chrome/Section";

const SURFACES = [
  { name: "Page", var: "--page-bg" },
  { name: "Background", var: "--bg" },
  { name: "Surface", var: "--surface" },
  { name: "Surface 2", var: "--surface-2" },
];
const TEXT = [
  { name: "Text", var: "--text" },
  { name: "Muted", var: "--text-muted" },
  { name: "Faint", var: "--text-faint" },
];
const ACCENT = [
  { name: "Accent", var: "--accent" },
  { name: "Success", var: "--success" },
  { name: "Danger", var: "--danger" },
  { name: "Warning", var: "--warn" },
];

function Swatches({ items }: { items: { name: string; var: string }[] }) {
  return (
    <div className="swatch-grid">
      {items.map((s) => (
        <div className="swatch" key={s.var}>
          <div className="sw-chip" style={{ background: `var(${s.var})` }} />
          <div className="sw-meta">
            <span className="sw-name">{s.name}</span>
            <span className="sw-var">{s.var}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Foundations() {
  return (
    <>
      <section className="sec" style={{ marginTop: 0 }}>
        <p className="found-intro">
          Every component in this kit is driven by a small set of CSS custom properties. Re-theme
          the whole system by overriding these <code>--tokens</code> — or switch the{" "}
          <strong>personality</strong> (Pebble / Slate / Pop) and <strong>theme</strong> above to
          watch them all change live.
        </p>
      </section>

      <Section num="01" title="Color" note="surfaces · text · semantic">
        <Grp label="surfaces & lines">
          <Swatches items={SURFACES} />
        </Grp>
        <Grp label="text">
          <Swatches items={TEXT} />
        </Grp>
        <Grp label="accent & semantic">
          <Swatches items={ACCENT} />
        </Grp>
      </Section>

      <Section num="02" title="Type Scale" note="font follows the active personality">
        <div className="scale-list">
          {[
            { name: "Display", spec: "44 / 700", cls: "t-h1", text: "Aa Quick fox" },
            { name: "Heading", spec: "32 / 700", cls: "t-h2", text: "Aa Quick fox" },
            { name: "Subhead", spec: "24 / 700", cls: "t-h3", text: "Aa Quick fox" },
            {
              name: "Body",
              spec: "15 / 400",
              cls: "t-body",
              text: "Aa Quick brown fox jumps over the lazy dog",
            },
            { name: "Small", spec: "13 / 400", cls: "t-small", text: "Aa Quick brown fox" },
            { name: "Caption", spec: "11 / 700", cls: "t-caption", text: "QUICK BROWN FOX" },
          ].map((r) => (
            <div className="scale-row" key={r.name}>
              <span className="scale-meta">
                <span className="sm-name">{r.name}</span>
                <span className="sm-spec">{r.spec}</span>
              </span>
              <span className={`scale-sample ${r.cls}`}>{r.text}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section num="03" title="Spacing" note="density-aware · scales with Tweaks">
        <div className="space-list">
          {[
            ["pad-1", 6],
            ["pad-2", 10],
            ["pad-3", 14],
            ["pad-4", 20],
            ["pad-5", 28],
          ].map(([name, px]) => (
            <div className="space-row" key={name}>
              <span className="space-bar" style={{ width: px as number }} />
              <span className="space-meta">
                <b>{name}</b> · {px}px
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section num="04" title="Radius" note="changes per personality + radius Tweak">
        <div className="spec-grid">
          {[
            ["Small", "--r-sm", "r-sm"],
            ["Medium", "--r-md", "r-md"],
            ["Large", "--r-lg", "r-lg"],
          ].map(([name, v, cls]) => (
            <div className="spec-tile" key={v}>
              <div className={`spec-box ${cls}`} />
              <div className="spec-cap">
                <span className="sc-name">{name}</span>
                <span className="sc-var">{v}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section num="05" title="Elevation" note="shadow ladder · personality-specific">
        <div className="spec-grid">
          {[
            ["Level 1", "--shadow-1", "sh-1"],
            ["Level 2", "--shadow-2", "sh-2"],
            ["Level 3", "--shadow-3", "sh-3"],
          ].map(([name, v, cls]) => (
            <div className="spec-tile" key={v}>
              <div className={`spec-box ${cls}`} />
              <div className="spec-cap">
                <span className="sc-name">{name}</span>
                <span className="sc-var">{v}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section num="06" title="Motion" note="durations + easings">
        <div className="spec-grid">
          {[
            ["Fast · Standard", "--dur-fast · --ease"],
            ["Base · Standard", "--dur · --ease"],
            ["Slow · Bounce", "--dur-slow · --ease-bounce"],
          ].map(([name, v]) => (
            <div className="spec-tile" key={v}>
              <div className="spec-box r-md" style={{ display: "grid", placeItems: "center" }}>
                <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{v}</span>
              </div>
              <div className="spec-cap">
                <span className="sc-name">{name}</span>
                <span className="sc-var">{v}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
