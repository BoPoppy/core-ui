import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorPicker } from "./color-picker";

const meta = {
  title: "Advanced/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A compact color picker offering three ways to pick the same value, kept in sync: click a preset swatch, drag the hue track, or type a 6-digit hex. The value is always a normalized lowercase hex string.

### When to use
- Letting users pick from a curated palette while still allowing an exact hex.
- Settings, theming and tagging UIs where a full native eyedropper would be overkill.

### Usage
\`\`\`tsx
import { ColorPicker } from "@fv/ui";

// Uncontrolled with a starting color
<ColorPicker defaultValue="#22c55e" onValueChange={setColor} />

// Controlled
<ColorPicker value={color} onValueChange={setColor} />

// Custom palette
<ColorPicker swatches={["#ef4444", "#3b82f6", "#22c55e"]} />
\`\`\`

### Accessibility
- The hex \`<input>\` is labelled "Hex color" and rejects non-hex characters; an invalid draft is flagged in the danger color until corrected on blur.
- Swatches are native \`<button>\`s labelled with their hex value and expose \`aria-pressed\` for the active one.
- The hue track is a pointer-driven enhancement — the hex input and swatches are the labelled, keyboard-accessible controls.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark themes — surface, swatch shape, border weight and the active-swatch accent ring all come from CSS tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    value: {
      control: false,
      description: "Controlled hex color. Pair with `onValueChange`.",
      table: { type: { summary: "string" } },
    },
    defaultValue: {
      control: "color",
      description: "Initial hex color when uncontrolled.",
      table: { type: { summary: "string" }, defaultValue: { summary: '"#6366f1"' } },
    },
    onValueChange: {
      control: false,
      description: "Called with the new normalized lowercase hex whenever the color changes.",
      table: { type: { summary: "(hex: string) => void" } },
    },
    swatches: {
      control: false,
      description: "Override the preset swatch palette (array of hex strings).",
      table: { type: { summary: "string[]" }, defaultValue: { summary: "16-color palette" } },
    },
  },
} satisfies Meta<typeof ColorPicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Preset: Story = {
  args: { defaultValue: "#22c55e" },
  parameters: {
    docs: {
      description: { story: "Seed an initial color with `defaultValue` (uncontrolled)." },
    },
  },
};
