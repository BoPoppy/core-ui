import type { Meta, StoryObj } from "@storybook/react-vite";
import { NumberField } from "./number-field";

const meta = {
  title: "Inputs/NumberField",
  component: NumberField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A numeric input flanked by **decrement / increment** stepper buttons, with built-in clamping to a \`min\`/\`max\` range and a configurable \`step\`.

### When to use
- Bounded quantities the user nudges up and down — cart counts, ratings, durations, table page sizes.
- When a discrete step (e.g. 25 at a time) makes more sense than free typing.

For free-form numbers without steppers, use a plain \`TextField\` with \`type="number"\`.

### Usage
\`\`\`tsx
import { NumberField } from "@fv/ui";

// Uncontrolled
<NumberField aria-label="Quantity" defaultValue={1} min={0} max={10} />

// Controlled
<NumberField aria-label="Seats" value={seats} onValueChange={setSeats} step={2} />
\`\`\`

### Accessibility
Renders a real \`<input type="number">\` (with \`inputMode="numeric"\`), so it is keyboard-focusable and editable directly. The stepper buttons are native \`<button type="button">\` with \`aria-label\` \`"Decrement"\` / \`"Increment"\` and auto-disable at the range bounds. Always pass an \`aria-label\` (or wire up an external \`<label>\`) since the field has no visible label of its own.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — surface, radius, border weight (Pop adds a hard \`fg\` border) and the accent focus ring all come from tokens.
`.trim(),
      },
    },
  },
  args: { "aria-label": "Quantity" },
  argTypes: {
    value: {
      control: "number",
      description: "Controlled value. Provide together with `onValueChange`.",
      table: { type: { summary: "number" } },
    },
    defaultValue: {
      control: "number",
      description: "Initial value when uncontrolled.",
      table: { type: { summary: "number" }, defaultValue: { summary: "0" } },
    },
    onValueChange: {
      control: false,
      description: "Fired with the new (clamped) value on step or edit.",
      table: { type: { summary: "(value: number) => void" } },
    },
    min: {
      control: "number",
      description: "Lower bound; decrement disables here.",
      table: { type: { summary: "number" }, defaultValue: { summary: "-Infinity" } },
    },
    max: {
      control: "number",
      description: "Upper bound; increment disables here.",
      table: { type: { summary: "number" }, defaultValue: { summary: "Infinity" } },
    },
    step: {
      control: "number",
      description: "Amount each stepper button adds or subtracts.",
      table: { type: { summary: "number" }, defaultValue: { summary: "1" } },
    },
    disabled: {
      control: "boolean",
      description: "Prevent interaction and dim the field.",
      table: { defaultValue: { summary: "false" } },
    },
    "aria-label": {
      control: "text",
      description: "Accessible name for the input (required — no visible label).",
      table: { type: { summary: "string" } },
    },
  },
} satisfies Meta<typeof NumberField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: 1 } };
export const Clamped: Story = {
  args: { defaultValue: 5, min: 0, max: 10, step: 1 },
  parameters: {
    docs: {
      description: {
        story: "Bounded to 0–10; the steppers disable once a bound is reached.",
      },
    },
  },
};
export const Stepped: Story = {
  args: { defaultValue: 0, step: 25, min: 0, max: 100 },
  parameters: {
    docs: { description: { story: "A `step` of 25 moves in larger increments." } },
  },
};
