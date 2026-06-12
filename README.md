<div align="center">

# @bopoppy/core-ui

**A token-driven React component library with three switchable personalities.**

One set of components. Three looks — **Pebble** (soft & rounded), **Slate** (crisp & minimal),
**Pop** (chunky & bold) — each in **light + dark**, with runtime tweaks for accent, radius,
density, and font. Accessible by default, responsive to 375px, LTR/RTL.

[![CI](https://github.com/BoPoppy/core-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/BoPoppy/core-ui/actions/workflows/ci.yml)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

</div>

---

## Why this exists

Most component libraries hard-code one visual identity. **@bopoppy/core-ui** is built on a **CSS-variable
token cascade**: the same markup re-skins into three distinct "personalities" × two themes by
flipping a single attribute on `<html>`. It's a design system you can re-brand per project without
forking components.

> This is a working slice of a larger 57-component design system (Inputs, Data display, Feedback,
> Surfaces, Navigation, Advanced). Components land in reviewable batches — see [Roadmap](#roadmap).

## Install

This package is published to **GitHub Packages** under the `@bopoppy` scope. Tell your package
manager where to find the scope by adding an `.npmrc` to the consuming project:

```ini
# .npmrc
@bopoppy:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

`GITHUB_TOKEN` must be a GitHub Personal Access Token with the `read:packages` scope (GitHub
Packages requires auth even for public packages). Then:

```bash
npm install @bopoppy/core-ui
```

```tsx
// Once, at your app root:
import "@bopoppy/core-ui/styles.css";

import { ThemeProvider, Button } from "@bopoppy/core-ui";

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
import { useTheme } from "@bopoppy/core-ui";

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
| **Inputs** | Button, TextField, Checkbox, Radio, Switch, Select, Slider, FAB, ButtonGroup, ToggleButtons, Rating, NumberField, OTPInput, TagInput, Autocomplete, Combobox | — |
| **Data display** | Badge, Avatar, Divider, List, Table, Tooltip, Popover, Kbd, TreeView, Timeline | Code Block, Icon Set |
| **Surfaces** | Card, Accordion, AppBar, Paper, Carousel | — |
| **Feedback** | Alert, Banner, Progress, Skeleton, Toast, EmptyState, Dialog | — |
| **Navigation** | Link, Breadcrumbs, Pagination, Stepper, BottomNav, Tabs, Menu, Menubar, SpeedDial, Drawer | — |
| **Advanced** | CommandPalette, DatePicker, DateRangePicker, TimePicker, ColorPicker, FileDropzone | — |

## Develop

```bash
pnpm install
pnpm storybook         # component workbench — switch personality/theme from the toolbar
pnpm playground        # the catalog showcase (masthead + personality/category tabs + Tweaks)
pnpm test              # Vitest + Testing Library + jest-axe
pnpm build             # tsup (ESM + types) + Tailwind (styles.css)
pnpm build:playground  # static catalog → playground/dist (deployed to GitHub Pages)
```

The **catalog** in [`playground/`](./playground) is a living reference that reuses the real
components; it auto-deploys to GitHub Pages on push to `main` (see `.github/workflows/pages.yml`).

## Tech

TypeScript · React 19 · Tailwind CSS v4 · [CVA](https://cva.style) · [Radix UI](https://radix-ui.com)
· tsup · Storybook 10 · Vitest + jest-axe · Changesets · Biome

## Roadmap

- [x] Foundation — token cascade, `ThemeProvider`, Tailwind v4 theme + custom variants
- [x] Batch 1 — Button, Badge, Card, TextField (+ stories, tests, a11y)
- [x] Batch 2 — Inputs (Checkbox, Radio, Switch, Select, Slider, FAB, ButtonGroup, ToggleButtons, Rating)
- [x] Batch 3 — Data display (Avatar, Divider, List, Table, Tooltip, Popover, Kbd)
- [x] Batch 4 — Feedback (Alert, Banner, Progress, Skeleton, Toast, EmptyState)
- [x] Batch 5 — Navigation + Dialog (Link, Breadcrumbs, Pagination, Stepper, BottomNav, Tabs, Menu, Dialog, Drawer)
- [x] Batch 6 — Surfaces + Advanced (Accordion, AppBar, Paper, Carousel, Command Palette)
- [x] Stretch — NumberField, OTPInput, TagInput, FileDropzone, DatePicker, ColorPicker
- [x] Remaining — Autocomplete, Combobox, TreeView, Timeline, Menubar, SpeedDial, TimePicker, DateRangePicker

**The component set is complete.** Optional extras only: a defined Icon Set and a syntax-highlighted Code Block.

## Repository setup

Three GitHub Actions run on push to `main`:

- **CI** (`ci.yml`) — lint, typecheck, test, build (+ Chromatic on PRs).
- **Release** (`release.yml`) — Changesets opens a "Version Packages" PR; merging it publishes to GitHub Packages.
- **Pages** (`pages.yml`) — builds the catalog and deploys it. Requires **Settings → Pages → Source: GitHub Actions** (one-time).

Dependabot (`.github/dependabot.yml`) opens weekly update PRs for npm deps and Actions.

### Protect `main`

Because a push to `main` can publish a package and deploy the site, protect the branch so changes land via reviewed PRs that pass CI.

**UI:** Settings → Branches → **Add branch ruleset** (or *Add rule*) targeting `main`, then enable:
- *Require a pull request before merging* (≥ 1 approval)
- *Require status checks to pass* → select the **verify** check from CI
- *Require branches to be up to date before merging*
- *Block force pushes*

**CLI** (requires the `gh` CLI; the protection endpoint needs all top-level keys present, so pass a JSON body):

```bash
gh api -X PUT repos/BoPoppy/core-ui/branches/main/protection --input - <<'JSON'
{
  "required_status_checks": { "strict": true, "contexts": ["verify"] },
  "enforce_admins": true,
  "required_pull_request_reviews": { "required_approving_review_count": 1 },
  "restrictions": null
}
JSON
```

To remove protection later: `gh api -X DELETE repos/BoPoppy/core-ui/branches/main/protection`.

## License

[MIT](./LICENSE) © Tri Vo
