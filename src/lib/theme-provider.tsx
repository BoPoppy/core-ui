import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "dark";
export type Personality = "pebble" | "slate" | "pop";
export type Density = "compact" | "regular" | "comfy";
export type Direction = "ltr" | "rtl";

const DENSITY_SCALE: Record<Density, number> = {
  compact: 0.86,
  regular: 1,
  comfy: 1.18,
};

export interface ThemeState {
  theme: Theme;
  personality: Personality;
  density: Density;
  direction: Direction;
  /** Optional accent override (any CSS color). Falls back to the token default. */
  accent?: string;
  /** Radius multiplier applied on top of each personality's base radii. */
  radiusScale: number;
}

export interface ThemeContextValue extends ThemeState {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setPersonality: (personality: Personality) => void;
  setDensity: (density: Density) => void;
  setDirection: (direction: Direction) => void;
  setAccent: (accent?: string) => void;
  setRadiusScale: (scale: number) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "fv-ui-theme";

const DEFAULTS: ThemeState = {
  theme: "light",
  personality: "pebble",
  density: "regular",
  direction: "ltr",
  accent: undefined,
  radiusScale: 1,
};

function readStored(): Partial<ThemeState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<ThemeState>) : {};
  } catch {
    return {};
  }
}

export interface ThemeProviderProps extends Partial<ThemeState> {
  children: ReactNode;
  /** Persist changes to localStorage. Defaults to true. */
  persist?: boolean;
  /** Element the data-attributes are written to. Defaults to document root. */
  target?: "root" | "self";
}

/**
 * Applies the runtime token attributes (`data-theme`, `data-personality`,
 * `dir`) and tweak overrides, and exposes setters via `useTheme()`.
 *
 * By default it writes to `document.documentElement` so the whole app
 * re-skins. Pass `target="self"` to scope the tokens to a wrapper element
 * (useful for previews / Storybook side-by-sides).
 */
export function ThemeProvider({
  children,
  persist = true,
  target = "root",
  ...overrides
}: ThemeProviderProps) {
  const [state, setState] = useState<ThemeState>(() => ({
    ...DEFAULTS,
    ...(persist ? readStored() : {}),
    ...overrides,
  }));

  const apply = useCallback(
    (el: HTMLElement) => {
      el.setAttribute("data-theme", state.theme);
      el.setAttribute("data-personality", state.personality);
      el.setAttribute("dir", state.direction);
      el.style.setProperty("--dens", String(DENSITY_SCALE[state.density]));
      el.style.setProperty("--r-scale", String(state.radiusScale));
      if (state.accent) {
        el.style.setProperty("--accent", state.accent);
        el.style.setProperty("--accent-hover", state.accent);
      } else {
        el.style.removeProperty("--accent");
        el.style.removeProperty("--accent-hover");
      }
    },
    [state],
  );

  useEffect(() => {
    if (target === "root" && typeof document !== "undefined") {
      apply(document.documentElement);
    }
    if (persist && typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [apply, persist, state, target]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      ...state,
      setTheme: (theme) => setState((s) => ({ ...s, theme })),
      toggleTheme: () => setState((s) => ({ ...s, theme: s.theme === "light" ? "dark" : "light" })),
      setPersonality: (personality) => setState((s) => ({ ...s, personality })),
      setDensity: (density) => setState((s) => ({ ...s, density })),
      setDirection: (direction) => setState((s) => ({ ...s, direction })),
      setAccent: (accent) => setState((s) => ({ ...s, accent })),
      setRadiusScale: (radiusScale) => setState((s) => ({ ...s, radiusScale })),
    }),
    [state],
  );

  // When scoped to self, render a wrapper carrying the attributes.
  if (target === "self") {
    return (
      <ThemeContext.Provider value={value}>
        <ScopedTokens state={state}>{children}</ScopedTokens>
      </ThemeContext.Provider>
    );
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function ScopedTokens({ state, children }: { state: ThemeState; children: ReactNode }) {
  const style: Record<string, string> = {
    "--dens": String(DENSITY_SCALE[state.density]),
    "--r-scale": String(state.radiusScale),
  };
  if (state.accent) {
    style["--accent"] = state.accent;
    style["--accent-hover"] = state.accent;
  }
  return (
    <div
      data-theme={state.theme}
      data-personality={state.personality}
      dir={state.direction}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}
