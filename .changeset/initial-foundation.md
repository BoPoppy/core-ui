---
"@fv/ui": minor
---

Initial release — token cascade foundation + Batch 1 components.

- **ThemeProvider** driving personality (Pebble / Slate / Pop), light/dark theme, density, RTL, and accent/radius tweaks, with `localStorage` persistence.
- Tailwind v4 token theme + `pebble:` / `slate:` / `pop:` / `dark:` custom variants.
- Components: **Button** (4 variants × 3 sizes, loading, `asChild`), **Badge**, **Card** (+ sub-parts), **TextField** (label/hint/error/success, fully wired a11y).
- Pre-compiled `@fv/ui/styles.css` so consumers don't need Tailwind installed.
