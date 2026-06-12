import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kbd, KbdCombo } from "./kbd";

const meta = {
  title: "Data display/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A keyboard key cap for documenting shortcuts inline — \`⌘\`, \`Esc\`, \`Enter\`. Render one \`Kbd\` per key and wrap a sequence in \`KbdCombo\` for spacing and a muted separator.

### When to use
- Showing a keyboard shortcut in help text, menus, tooltips or a command palette.
- Documenting hotkeys in prose.

This is presentational only — it does not bind or listen for the key.

### Usage
\`\`\`tsx
import { Kbd, KbdCombo } from "@fv/ui";

<Kbd>Esc</Kbd>

// A key combination
<KbdCombo>
  <Kbd>⌘</Kbd>
  <span>+</span>
  <Kbd>K</Kbd>
</KbdCombo>
\`\`\`

### Accessibility
Renders a semantic \`<kbd>\` element, the native HTML element for keyboard input, so assistive tech can recognize it as such. Use the literal key glyphs/labels as the children.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — the cap surface, border weight and bottom-edge "key" shadow follow the active personality.
`.trim(),
      },
    },
  },
  argTypes: {
    children: { control: "text", description: "The key label or glyph (e.g. `⌘`, `Esc`, `K`)." },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = { args: { children: "Esc" } };
export const Combo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Wrap several `Kbd` keys in `KbdCombo` to render a shortcut like ⌘ + K with consistent spacing.",
      },
    },
  },
  render: () => (
    <KbdCombo>
      <Kbd>⌘</Kbd>
      <span>+</span>
      <Kbd>K</Kbd>
    </KbdCombo>
  ),
};
