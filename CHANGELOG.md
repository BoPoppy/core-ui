# @bopoppy/core-ui

## 0.4.1

### Patch Changes

- [#23](https://github.com/BoPoppy/core-ui/pull/23) [`1311a63`](https://github.com/BoPoppy/core-ui/commit/1311a63c1ef68d4090a85ab8129e56652ddc542d) Thanks [@BoPoppy](https://github.com/BoPoppy)! - fix cicd

- [#24](https://github.com/BoPoppy/core-ui/pull/24) [`4cbaeca`](https://github.com/BoPoppy/core-ui/commit/4cbaeca9cdde5e1b625bc0903a07407bad052711) Thanks [@BoPoppy](https://github.com/BoPoppy)! - update cicd

## 0.4.0

### Minor Changes

- 86c6215: Add `Textarea` and `TextareaField` for multi-line text entry, completing the Text Field section from the design. `TextareaField` mirrors `TextField` (label/hint/error/success wiring, `aria-describedby` + `aria-invalid`) and the bare `Textarea` shares the input token styling with a resizable `min-height`.
- 86c6215: Add optional `label` (and `hint`) props to `NumberField`, `Autocomplete`, `Combobox`, `TagInput`, and `OTPInput`, matching the design's labelled fields. The label/hint chrome is wired for accessibility per control type — `htmlFor`/`id` for the input-backed controls (NumberField, Autocomplete, TagInput) and `aria-labelledby` for the composite controls (Combobox's button, OTPInput's group) — with the hint linked via `aria-describedby`. Passing neither renders the control bare, so existing usages are unchanged.
- 86c6215: `Slider` now matches the design's labelled field:

  - Optional `label` prop renders a label above the track (e.g. "Volume", "Price range") and is wired to the thumb(s) for screen readers via `aria-labelledby` (a range prefixes the label per thumb).
  - A value bubble surfaces the current number above each thumb on hover/focus and while dragging, ported from the design's `.bubble`. Toggle it with `showValue` (on by default); it's decorative (`aria-hidden`) since the value is already announced via `aria-valuenow`.

  Sliders without a `label` keep their bare track; existing usages are unchanged apart from the new bubble.

- 86c6215: Fix bugs UI

### Patch Changes

- 86c6215: `Autocomplete` and `Combobox` now animate their options menu both opening and closing — a symmetric fade + drop-in/out (opacity, transform, and visibility transition), matching the design's animated dropdown. The menu stays mounted and toggles the transition via its open state, so closing fades out instead of disappearing instantly. Respects `prefers-reduced-motion`.
- 86c6215: Fix `AvatarGroup` hover behavior. Hovering anywhere on the stack lifted every avatar at once because the hover variant compiled to `&:hover > *`. Now only the hovered avatar lifts and it rises to the front (`z-index`), matching the design.
- 86c6215: Fix a stray focus ring inside `TagInput` and `NumberField`. Their borderless inner `<input>` matched the global `:focus-visible` box-shadow rule and drew its own ring inside the wrapper — which already shows the focus ring — producing a double "shadow box". The inner input now suppresses that ring (`focus-visible:shadow-none`), so only the wrapper's ring shows, matching the design.
- 86c6215: `TagInput` now keeps its placeholder visible after tags are added, matching the design (which always shows "Add a tag…"). Previously the placeholder was hidden once any tag existed.

## 0.3.0

### Minor Changes

- fix responsiveness for playground

## 0.2.0

### Minor Changes

- 0805bfa: fix responsiveness for playground preview

## 0.1.0

### Minor Changes

- 56d476b: Batch 2 — the rest of the Inputs category.

  - **Checkbox**, **Radio** / **RadioGroup**, **Switch** — Radix-backed, token-styled, label-wired.
  - **Select** — styled native select (keeps native a11y + mobile pickers), with label/hint/error.
  - **Slider** — Radix-backed, single value or range.
  - **FAB** — floating action button (sizes + extended pill).
  - **ButtonGroup** / **ToggleButtons** — segmented controls (single or multiple) on Radix ToggleGroup.
  - **Rating** — keyboard-accessible star rating, interactive or read-only.

- 5490506: Batch 3 — Data display.

  - **Avatar** (+ **AvatarGroup**) — image with initials/icon fallback, status dot, 5 sizes.
  - **Divider** — solid/dashed, horizontal/vertical, optional centered label.
  - **List** / **ListItem** — bordered list with icon/title/subtitle/meta slots.
  - **Table** (+ **TableEmpty**) — composable, token-styled, with an empty/error state row.
  - **Tooltip** — Radix-backed ink bubble with arrow, 4 sides.
  - **Popover** — Radix-backed surface with arrow, focus management, composable parts.
  - **Kbd** / **KbdCombo** — keyboard key caps.

- be6086c: Batch 4 — Feedback.

  - **Alert** — inline message, 4 variants (info/success/warn/danger), default glyphs, dismissible.
  - **Banner** — page-level message bar (solid/subtle) with description, actions, dismiss.
  - **Progress** — linear (determinate + indeterminate), **CircularProgress** ring, **Spinner**.
  - **Skeleton** — shimmering placeholder (block/text/circle).
  - **Toast** — imperative `useToast().toast(...)` API on a `ToastProvider`, built on Radix Toast
    (swipe-to-dismiss, timers, screen-reader announcements).
  - **EmptyState** — centered placeholder with icon, title, description, and action.

- 62cbb33: Batch 5 — Navigation + Dialog.

  - **Link** — animated-underline / underline / muted variants.
  - **Breadcrumbs** — items array, custom separator, current-page semantics.
  - **Pagination** — numeric pages with prev/next and ellipsis truncation.
  - **Stepper** — horizontal progress across labelled steps (done / active / upcoming).
  - **BottomNav** — mobile-style bottom navigation bar.
  - **Tabs** — Radix-backed, underline + pill variants.
  - **Menu** — Radix DropdownMenu (items, labels, separators, shortcuts, danger).
  - **Dialog** — Radix-backed modal with overlay, focus trap, composable parts.
  - **Drawer** — Radix Dialog sliding from any side (left/right/top/bottom).

- 02faeaa: Batch 6 — Surfaces + Advanced.

  - **Accordion** — Radix-backed, animated expand/collapse with rotating chevron.
  - **Paper** — plain elevated surface (4 elevation levels).
  - **AppBar** — accent-colored top bar with composable title / icon / spacer parts.
  - **Carousel** — slide track with dots and arrows, controlled or uncontrolled.
  - **CommandPalette** — ⌘K-style searchable command menu on Radix Dialog: live filtering,
    grouped results, full keyboard nav (↑/↓/Enter/Esc), plus a `useCommandPaletteShortcut` hook.

- 8a9d61d: Initial release — token cascade foundation + Batch 1 components.

  - **ThemeProvider** driving personality (Pebble / Slate / Pop), light/dark theme, density, RTL, and accent/radius tweaks, with `localStorage` persistence.
  - Tailwind v4 token theme + `pebble:` / `slate:` / `pop:` / `dark:` custom variants.
  - Components: **Button** (4 variants × 3 sizes, loading, `asChild`), **Badge**, **Card** (+ sub-parts), **TextField** (label/hint/error/success, fully wired a11y).
  - Pre-compiled `@fv/ui/styles.css` so consumers don't need Tailwind installed.

- 3819c6b: Remaining set — completes the component library.

  - **Autocomplete** — single-select filtering combobox (type to filter, ↑/↓/Enter, outside-click close).
  - **Combobox** — multi-select with chips and checkable options.
  - **TreeView** — recursive expand/collapse hierarchy with keyboard support.
  - **Timeline** — vertical activity feed with status nodes.
  - **Menubar** — Radix Menubar (File/Edit/View-style app menus).
  - **SpeedDial** — a FAB that fans out actions.
  - **TimePicker** — segmented 12-hour entry with AM/PM toggle and arrow-key steppers.
  - **DateRangePicker** (+ **RangeCalendar**) — start→end range selection in a popover.

  Adds an internal `useClickOutside` hook for the custom dropdowns.

- 9e7ac4e: Stretch — rich inputs + advanced pickers.

  - **NumberField** — stepper buttons, clamping, step.
  - **OTPInput** — one-time-code field: auto-advance, Backspace step-back, paste-to-fill.
  - **TagInput** — chip input (Enter/comma to add, Backspace to remove last, dedupe).
  - **FileDropzone** — drag-and-drop or click to browse, file list with remove + fill animation.
  - **DatePicker** (+ **Calendar**) — month grid with selection/today marker in a popover.
  - **ColorPicker** — three synced input methods: swatches, draggable hue track, editable hex.
