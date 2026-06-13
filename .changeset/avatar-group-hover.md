---
"@bopoppy/core-ui": patch
---

Fix `AvatarGroup` hover behavior. Hovering anywhere on the stack lifted every avatar at once because the hover variant compiled to `&:hover > *`. Now only the hovered avatar lifts and it rises to the front (`z-index`), matching the design.
