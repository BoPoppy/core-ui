import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./slider";

const meta = {
  title: "Inputs/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A draggable control for picking a number (or a numeric range) from a continuous or stepped scale. Value is always an array; one thumb is rendered per entry.

### When to use
- Choosing along a continuous or coarse-stepped scale (volume, price range, opacity) where the relative position matters more than the exact figure.

For an exact number prefer a NumberField, and for a discrete N-star score use [Rating](/docs/inputs-rating--docs).

### Usage
\`\`\`tsx
import { Slider } from "@fv/ui";

// Single value
<Slider defaultValue={[50]} max={100} step={1} />

// Range — pass two values, get two thumbs
<Slider defaultValue={[25, 75]} max={100} onValueChange={setRange} />
\`\`\`

### Accessibility
Built on [Radix Slider](https://www.radix-ui.com/primitives/docs/components/slider), so it inherits full keyboard support (arrow keys, Page Up/Down, Home/End) and the correct \`role="slider"\` / \`aria-value*\` semantics on each thumb. Thumbs carry an \`aria-label\` (\`"Value"\`, or \`"Value 1"\` / \`"Value 2"\` for ranges).

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — track, range fill, thumb border and focus ring all derive from tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: false,
      description: "Uncontrolled initial value(s). One thumb is rendered per array entry.",
      table: { type: { summary: "number[]" } },
    },
    value: {
      control: false,
      description: "Controlled value(s).",
      table: { type: { summary: "number[]" } },
    },
    onValueChange: {
      control: false,
      description: "Called with the new value array as the thumb is dragged.",
      table: { type: { summary: "(value: number[]) => void" } },
    },
    min: {
      control: { type: "number" },
      description: "Minimum value.",
      table: { type: { summary: "number" }, defaultValue: { summary: "0" } },
    },
    max: {
      control: { type: "number" },
      description: "Maximum value.",
      table: { type: { summary: "number" }, defaultValue: { summary: "100" } },
    },
    step: {
      control: { type: "number" },
      description: "Increment between selectable values.",
      table: { type: { summary: "number" }, defaultValue: { summary: "1" } },
    },
    disabled: {
      control: "boolean",
      description: "Prevent interaction and dim the slider.",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: [50], max: 100, step: 1 } };
export const Stepped: Story = {
  args: { defaultValue: [40], max: 100, step: 20 },
  parameters: {
    docs: { description: { story: "A larger `step` snaps the thumb to coarse increments." } },
  },
};
export const Range: Story = {
  args: { defaultValue: [25, 75], max: 100, step: 1 },
  parameters: {
    docs: { description: { story: "Pass two values to get a range with two independent thumbs." } },
  },
};
export const Disabled: Story = { args: { defaultValue: [30], disabled: true } };
