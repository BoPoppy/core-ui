---
"@bopoppy/core-ui": minor
---

Add optional `label` (and `hint`) props to `NumberField`, `Autocomplete`, `Combobox`, `TagInput`, and `OTPInput`, matching the design's labelled fields. The label/hint chrome is wired for accessibility per control type — `htmlFor`/`id` for the input-backed controls (NumberField, Autocomplete, TagInput) and `aria-labelledby` for the composite controls (Combobox's button, OTPInput's group) — with the hint linked via `aria-describedby`. Passing neither renders the control bare, so existing usages are unchanged.
