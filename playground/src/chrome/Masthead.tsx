import { useTheme } from "@bopoppy/core-ui";

export function Masthead() {
  const { theme, toggleTheme, direction, setDirection } = useTheme();
  return (
    <header className="masthead">
      <div className="mast-l">
        <div className="kicker">core component kit ✎</div>
        <h1 className="mast-title">Core&nbsp;UI</h1>
        <div className="mast-sub">one catalog · three personalities · drop into any project</div>
      </div>
      <div className="mast-controls">
        <button
          className="theme-btn"
          type="button"
          onClick={() => setDirection(direction === "ltr" ? "rtl" : "ltr")}
        >
          ⇄ {direction === "ltr" ? "RTL" : "LTR"}
        </button>
        <button className="theme-btn" type="button" onClick={toggleTheme}>
          ◐ flip to {theme === "light" ? "dark" : "light"}
        </button>
      </div>
    </header>
  );
}
