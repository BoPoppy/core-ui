import { type Personality, useTheme } from "@bopoppy/core-ui";

const OPTIONS: { value: Personality; name: string; desc: string }[] = [
  { value: "pebble", name: "Pebble", desc: "soft · rounded · pillowy" },
  { value: "slate", name: "Slate", desc: "crisp · minimal · precise" },
  { value: "pop", name: "Pop", desc: "bold · chunky · playful" },
];

export function PersonalityTabs() {
  const { personality, setPersonality } = useTheme();
  return (
    <div className="dirtabs" role="tablist" aria-label="Design personalities">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          className="dirtab"
          role="tab"
          type="button"
          aria-selected={personality === o.value}
          onClick={() => setPersonality(o.value)}
        >
          <span className="card-ish">
            <span className="dt-name">{o.name}</span>
            <span className="dt-desc">{o.desc}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
