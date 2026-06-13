---
"@bopoppy/core-ui": minor
---

`Slider` now matches the design's labelled field:

- Optional `label` prop renders a label above the track (e.g. "Volume", "Price range") and is wired to the thumb(s) for screen readers via `aria-labelledby` (a range prefixes the label per thumb).
- A value bubble surfaces the current number above each thumb on hover/focus and while dragging, ported from the design's `.bubble`. Toggle it with `showValue` (on by default); it's decorative (`aria-hidden`) since the value is already announced via `aria-valuenow`.

Sliders without a `label` keep their bare track; existing usages are unchanged apart from the new bubble.
