import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonGroup, ButtonGroupItem } from "./button-group";

const meta = {
  title: "Inputs/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A segmented control — a row of connected buttons that share borders and behave as one selection. Built on Radix ToggleGroup, with \`type="single"\` (pick one) or \`type="multiple"\` (toggle several, e.g. text formatting).

### When to use
- Choosing one option from a small, mutually exclusive set (e.g. Day / Week / Month).
- Toggling independent formatting options with \`type="multiple"\` (e.g. bold / italic / underline).

For unconnected actions, use individual [Button](/docs/inputs-button--docs)s. For binary on/off, a single toggle or [Checkbox](/docs/inputs-checkbox--docs) is clearer.

### Usage
\`\`\`tsx
import { ButtonGroup, ButtonGroupItem } from "@fv/ui";

// Single selection
<ButtonGroup type="single" defaultValue="week">
  <ButtonGroupItem value="day">Day</ButtonGroupItem>
  <ButtonGroupItem value="week">Week</ButtonGroupItem>
  <ButtonGroupItem value="month">Month</ButtonGroupItem>
</ButtonGroup>

// Multiple selection
<ButtonGroup type="multiple" defaultValue={["bold"]}>
  <ButtonGroupItem value="bold">B</ButtonGroupItem>
  <ButtonGroupItem value="italic">I</ButtonGroupItem>
</ButtonGroup>
\`\`\`

### Accessibility
Inherits Radix ToggleGroup's accessibility: roving tabindex, arrow-key navigation between items, and the correct \`role\` / \`aria-pressed\` (or radio semantics) for the chosen \`type\`. Selected items expose \`data-state="on"\`. Give icon-only items an \`aria-label\`.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark themes — connected-border radius, accent fill for the active segment and focus ring all come from CSS tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["single", "multiple"],
      description:
        "Selection mode. `single` selects at most one item; `multiple` allows toggling several independently.",
      table: { type: { summary: '"single" | "multiple"' } },
    },
  },
  args: { type: "single" },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  parameters: {
    docs: { description: { story: '`type="single"` — at most one segment is active at a time.' } },
  },
  render: () => (
    <ButtonGroup type="single" defaultValue="week">
      <ButtonGroupItem value="day">Day</ButtonGroupItem>
      <ButtonGroupItem value="week">Week</ButtonGroupItem>
      <ButtonGroupItem value="month">Month</ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const Multiple: Story = {
  parameters: {
    docs: {
      description: { story: '`type="multiple"` — each segment toggles on/off independently.' },
    },
  },
  render: () => (
    <ButtonGroup type="multiple" defaultValue={["bold"]}>
      <ButtonGroupItem value="bold">B</ButtonGroupItem>
      <ButtonGroupItem value="italic">I</ButtonGroupItem>
      <ButtonGroupItem value="underline">U</ButtonGroupItem>
    </ButtonGroup>
  ),
};
