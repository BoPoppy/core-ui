---
"@bopoppy/core-ui": patch
---

Fix a stray focus ring inside `TagInput` and `NumberField`. Their borderless inner `<input>` matched the global `:focus-visible` box-shadow rule and drew its own ring inside the wrapper — which already shows the focus ring — producing a double "shadow box". The inner input now suppresses that ring (`focus-visible:shadow-none`), so only the wrapper's ring shows, matching the design.
