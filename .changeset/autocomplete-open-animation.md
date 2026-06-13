---
"@bopoppy/core-ui": patch
---

`Autocomplete` and `Combobox` now animate their options menu both opening and closing — a symmetric fade + drop-in/out (opacity, transform, and visibility transition), matching the design's animated dropdown. The menu stays mounted and toggles the transition via its open state, so closing fades out instead of disappearing instantly. Respects `prefers-reduced-motion`.
