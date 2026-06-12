<div align="center">

# @fv/ui

**A token-driven React component library with three switchable personalities.**

One set of components. Three looks — **Pebble** (soft & rounded), **Slate** (crisp & minimal),
**Pop** (chunky & bold) — each in **light + dark**, with runtime tweaks for accent, radius,
density, and font. Accessible by default, responsive to 375px, LTR/RTL.

[![npm](https://img.shields.io/npm/v/@fv/ui.svg)](https://www.npmjs.com/package/@fv/ui)
[![CI](https://github.com/your-handle/core-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/your-handle/core-ui/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/@fv/ui.svg)](./LICENSE)

</div>

---

## Why this exists

Most component libraries hard-code one visual identity. **@fv/ui** is built on a **CSS-variable
token cascade**: the same markup re-skins into three distinct "personalities" × two themes by
flipping a single attribute on `<html>`. It's a design system you can re-brand per project without
forking components.

> This is a working slice of a larger 57-component design system (Inputs, Data display, Feedback,
> Surfaces, Navigation, Advanced). Components land in reviewable batches — see [Roadmap](#roadmap).

## Install

```bash
npm install @fv/ui
```

```tsx
// Once, at your app root:
import "@fv/ui/styles.css";

import { ThemeProvider, Button } from "@fv/ui";

export function App() {
  return (
    <ThemeProvider personality="pebble" theme="light">
      <Button>Get started</Button>
    </ThemeProvider>
  );
}
```

The stylesheet ships **pre-compiled** — you don't need Tailwind installed to consume the library.

## The token architecture (the core idea)

Everything is driven by CSS custom properties, layered low → high precedence:

| Layer | Set on | What it controls |
| --- | --- | --- |
| **1. Base colors** | `:root` / `[data-theme="dark"]` | `--surface`, `--text`, `--accent`, semantic colors |
| **2. Personality** | `[data-personality="pebble\|slate\|pop"]` | radius bases, border width/color, shadows, press transform, font |
| **3. Computed** | `:root` | radii (`base × --r-scale`), density-scaled spacing (`× --dens`) |
| **4. Motion** | `:root` | durations + easings |
| **5. Tweaks** | inline on `<html>` | accent / radius / density / font overrides (highest precedence) |

Switching `data-personality` re-skins the **entire** UI. Components express
personality-conditional styling with Tailwind v4 custom variants:

```tsx
// inside a CVA recipe — reads the active personality off the ancestor <html>
"rounded-sm pebble:rounded-full pop:border-fg"
```

> **Naming note:** the personality attribute is `data-personality` (renamed from the design's
> `data-dir` to avoid colliding with the real `dir` text-direction attribute).

## Theming at runtime

```tsx
import { useTheme } from "@fv/ui";

function Toolbar() {
  const { theme, toggleTheme, setPersonality, setDensity, setAccent } = useTheme();
  return (
    <>
      <button onClick={toggleTheme}>Theme: {theme}</button>
      <button onClick={() => setPersonality("pop")}>Pop</button>
      <button onClick={() => setDensity("compact")}>Compact</button>
      <button onClick={() => setAccent("#6366f1")}>Indigo accent</button>
    </>
  );
}
```

All state persists to `localStorage` and is restored on reload.

## Components

| Category | Shipped | Planned |
| --- | --- | --- |
| **Inputs** | Button, TextField, Checkbox, Radio, Switch, Select, Slider, FAB, ButtonGroup, ToggleButtons, Rating, NumberField, OTPInput, TagInput | Autocomplete, Multi-select Combobox |
| **Data display** | Badge, Avatar, Divider, List, Table, Tooltip, Popover, Kbd | Typography, Tree, Timeline, Code Block, Icon Set |
| **Surfaces** | Card, Accordion, AppBar, Paper, Carousel | — |
| **Advanced** | CommandPalette, DatePicker, ColorPicker, FileDropzone | Time Picker, Date Range |
| **Feedback** | Alert, Banner, Progress, Skeleton, Toast, EmptyState, Dialog | Snackbar variants |
| **Navigation** | Link, Breadcrumbs, Pagination, Stepper, BottomNav, Tabs, Menu, Drawer | Menubar, Speed Dial |
| **Advanced** | — | Command Palette, Date Picker, Color Picker, File Dropzone |

## Develop

```bash
pnpm install
pnpm storybook      # component workbench — switch personality/theme from the toolbar
pnpm test           # Vitest + Testing Library + jest-axe
pnpm build          # tsup (ESM + types) + Tailwind (styles.css)
```

## Tech

TypeScript · React 19 · Tailwind CSS v4 · [CVA](https://cva.style) · [Radix UI](https://radix-ui.com)
· tsup · Storybook 8 · Vitest + jest-axe · Changesets · Biome

## Roadmap

- [x] Foundation — token cascade, `ThemeProvider`, Tailwind v4 theme + custom variants
- [x] Batch 1 — Button, Badge, Card, TextField (+ stories, tests, a11y)
- [x] Batch 2 — Inputs (Checkbox, Radio, Switch, Select, Slider, FAB, ButtonGroup, ToggleButtons, Rating)
- [x] Batch 3 — Data display (Avatar, Divider, List, Table, Tooltip, Popover, Kbd)
- [x] Batch 4 — Feedback (Alert, Banner, Progress, Skeleton, Toast, EmptyState)
- [x] Batch 5 — Navigation + Dialog (Link, Breadcrumbs, Pagination, Stepper, BottomNav, Tabs, Menu, Dialog, Drawer)
- [x] Batch 6 — Surfaces + Advanced (Accordion, AppBar, Paper, Carousel, Command Palette)
- [x] Stretch — NumberField, OTPInput, TagInput, FileDropzone, DatePicker, ColorPicker
- [ ] Remaining — Autocomplete, Combobox, Tree, Timeline, Menubar, Speed Dial, Time Picker, Date Range

## License

[MIT](./LICENSE) © Tri Vo
