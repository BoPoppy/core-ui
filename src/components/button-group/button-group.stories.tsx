import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { ButtonGroup, ButtonGroupItem } from "./button-group";

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <circle cx="5" cy="12" r="1.8" />
    <circle cx="12" cy="12" r="1.8" />
    <circle cx="19" cy="12" r="1.8" />
  </svg>
);

const meta = {
  title: "Inputs/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A row of connected buttons that share borders and rounded ends. It has two modes:

- **Segmented control** (\`type="single" | "multiple"\`) — built on Radix ToggleGroup; tracks selection. Children are \`<ButtonGroupItem>\`s.
- **Grouped actions** (omit \`type\`) — a presentational \`<div role="group">\` that visually connects plain \`<Button>\` children. Nothing is selected; each button is its own action.

### When to use
- Choosing one option from a small, mutually exclusive set (e.g. Day / Week / Month) → \`type="single"\`.
- Toggling independent formatting options (e.g. bold / italic / underline) → \`type="multiple"\`.
- Connecting a few related actions into one control (e.g. Save / Duplicate / ⋯) → no \`type\`.

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

export const GroupedActions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "No `type` → a non-selectable group of connected actions. Children are plain `<Button>`s; nothing is toggled.",
      },
    },
  },
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Save</Button>
      <Button variant="secondary">Duplicate</Button>
      <Button variant="secondary" iconOnly aria-label="more">
        <MoreIcon />
      </Button>
    </ButtonGroup>
  ),
};
