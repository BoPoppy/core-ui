export type CategoryId =
  | "foundations"
  | "inputs"
  | "data"
  | "feedback"
  | "surfaces"
  | "nav"
  | "advanced";

export const CATEGORIES: { id: CategoryId; label: string; count?: number }[] = [
  { id: "foundations", label: "Foundations" },
  { id: "inputs", label: "Inputs", count: 14 },
  { id: "data", label: "Data display", count: 13 },
  { id: "feedback", label: "Feedback", count: 8 },
  { id: "surfaces", label: "Surfaces", count: 5 },
  { id: "nav", label: "Navigation", count: 11 },
  { id: "advanced", label: "Advanced", count: 6 },
];

export function CategoryTabs({
  active,
  onChange,
}: {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
}) {
  return (
    <div className="cattabs" role="tablist" aria-label="Component categories">
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          className="cattab"
          role="tab"
          type="button"
          aria-selected={active === c.id}
          onClick={() => onChange(c.id)}
        >
          {c.label}
          {c.count ? <span className="ct-count">{c.count}</span> : null}
        </button>
      ))}
    </div>
  );
}
