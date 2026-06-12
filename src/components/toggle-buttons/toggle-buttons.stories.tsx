import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleButtons, ToggleButtonsItem } from "./toggle-buttons";

const meta = {
  title: "Inputs/ToggleButtons",
  component: ToggleButtons,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A padded "pill" segmented control where the selected item floats above a recessed track. Use it to pick between a small set of mutually exclusive options (single) or to toggle several independent options (multiple).

### When to use
- Switch between equivalent views or modes — list / grid / board, day / week / month.
- Toggle a handful of independent text-formatting style options (multiple).

Keep the set small (2–5 items) and the labels short. For a longer or more open-ended list use a Select; for a single on/off state use a Switch.

### Usage
\`\`\`tsx
import { ToggleButtons, ToggleButtonsItem } from "@fv/ui";

// Single selection — one item active at a time
<ToggleButtons type="single" defaultValue="grid">
  <ToggleButtonsItem value="list">List</ToggleButtonsItem>
  <ToggleButtonsItem value="grid">Grid</ToggleButtonsItem>
  <ToggleButtonsItem value="board">Board</ToggleButtonsItem>
</ToggleButtons>

// Multiple selection — any number active
<ToggleButtons type="multiple" defaultValue={["bold"]}>
  <ToggleButtonsItem value="bold">B</ToggleButtonsItem>
  <ToggleButtonsItem value="italic">I</ToggleButtonsItem>
</ToggleButtons>
\`\`\`

### Accessibility
Built on [Radix Toggle Group](https://www.radix-ui.com/primitives/docs/components/toggle-group), so it inherits roving-tabindex arrow-key navigation between items and the correct \`role\`/\`aria-pressed\` semantics. The active item carries \`data-state="on"\`; for icon-only items provide an \`aria-label\` on the \`ToggleButtonsItem\`.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark — track surface, item radius, border weight, and the raised-item shadow all come from CSS tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["single", "multiple"],
      description: "Whether one item or many can be selected at a time.",
      table: { type: { summary: '"single" | "multiple"' } },
    },
    value: {
      control: false,
      description:
        "Controlled selected value(s). A string for `single`, a string[] for `multiple`.",
    },
    defaultValue: {
      control: false,
      description: "Uncontrolled initial selection.",
    },
    onValueChange: {
      control: false,
      description: "Fires with the new value(s) when the selection changes.",
      table: { type: { summary: "(value) => void" } },
    },
    children: { control: false, description: "`ToggleButtonsItem` elements." },
  },
  args: { type: "single" },
} satisfies Meta<typeof ToggleButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  parameters: {
    docs: {
      description: {
        story: '`type="single"` keeps exactly one item selected — here `grid` starts active.',
      },
    },
  },
  render: () => (
    <ToggleButtons type="single" defaultValue="grid">
      <ToggleButtonsItem value="list">List</ToggleButtonsItem>
      <ToggleButtonsItem value="grid">Grid</ToggleButtonsItem>
      <ToggleButtonsItem value="board">Board</ToggleButtonsItem>
    </ToggleButtons>
  ),
};
