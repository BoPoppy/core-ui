import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rating } from "./rating";

const meta = {
  title: "Inputs/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A star rating control for capturing or displaying a score out of a fixed number of stars.

### When to use
- Let a user rate something (a product, an experience) on a 1–N scale.
- Display an existing average or score with \`readOnly\`.

For a continuous numeric value (e.g. volume, brightness) use a [Slider](/docs/inputs-slider--docs) instead.

### Usage
\`\`\`tsx
import { Rating } from "@fv/ui";

// Interactive, controlled
<Rating value={score} onValueChange={setScore} />

// Read-only display, out of 10
<Rating value={7} max={10} readOnly />
\`\`\`

### Accessibility
The interactive control is a focusable \`role="slider"\` (\`aria-valuemin\` / \`aria-valuemax\` / \`aria-valuenow\`) driven by arrow keys: Left/Down decrease, Right/Up increase. In \`readOnly\` mode it renders as \`role="img"\` with a label like \`"Rating: 4 of 5"\`. Pass \`aria-label\` to describe what is being rated.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — filled stars use the \`--warn\` token and empty stars the strong border token.
`.trim(),
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "number" },
      description: "Controlled value (number of filled stars).",
      table: { type: { summary: "number" } },
    },
    defaultValue: {
      control: { type: "number" },
      description: "Uncontrolled initial value.",
      table: { type: { summary: "number" }, defaultValue: { summary: "0" } },
    },
    onValueChange: {
      control: false,
      description: "Called with the new value when a star is clicked or set via keyboard.",
      table: { type: { summary: "(value: number) => void" } },
    },
    max: {
      control: { type: "number" },
      description: "Total number of stars rendered.",
      table: { type: { summary: "number" }, defaultValue: { summary: "5" } },
    },
    readOnly: {
      control: "boolean",
      description: 'Render as a non-interactive display (`role="img"`).',
      table: { defaultValue: { summary: "false" } },
    },
    "aria-label": {
      control: "text",
      description: "Describes what is being rated.",
      table: { type: { summary: "string" }, defaultValue: { summary: '"Rating"' } },
    },
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: 3 },
  parameters: {
    docs: {
      description: {
        story: "Interactive: click a star or focus and use the arrow keys to change the value.",
      },
    },
  },
};
export const ReadOnly: Story = {
  args: { value: 4, readOnly: true },
  parameters: {
    docs: {
      description: {
        story: '`readOnly` renders a non-interactive `role="img"` for displaying a score.',
      },
    },
  },
};
export const TenStars: Story = { args: { defaultValue: 7, max: 10 } };
