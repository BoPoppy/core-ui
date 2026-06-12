import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./checkbox";

const meta = {
  title: "Inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A Radix-backed checkbox for boolean and multi-select choices. Fills with the accent color when checked and renders an optional inline label.

### When to use
- A single on/off toggle (e.g. "Accept terms").
- A list of independent options where any number can be selected.

For mutually exclusive choices use a radio group, and for an immediate-effect on/off setting consider a switch.

### Usage
\`\`\`tsx
import { Checkbox } from "@fv/ui";

// With a label (clicking the label toggles the box)
<Checkbox label="Accept terms" />

// Controlled
<Checkbox label="Subscribed" checked={on} onCheckedChange={setOn} />

// Icon-only / table-row checkbox — label it for screen readers
<Checkbox aria-label="Select row" />
\`\`\`

### Accessibility
Inherits Radix Checkbox's accessibility (correct \`role="checkbox"\`, \`aria-checked\`, keyboard toggle with Space). When \`label\` is set, the box is wired to it via \`aria-labelledby\` and a wrapping \`<label>\`, so clicking the text toggles it. With no \`label\`, supply an \`aria-label\`. Supports an indeterminate state via Radix's \`checked="indeterminate"\`.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark themes — box radius, accent fill, border weight and focus ring all come from CSS tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description:
        "Optional inline label rendered to the right of the box; clicking it toggles the checkbox.",
      table: { type: { summary: "React.ReactNode" } },
    },
    checked: {
      control: false,
      description:
        'Controlled checked state. Use `true` / `false`, or `"indeterminate"` for a mixed state. Pair with `onCheckedChange`.',
      table: { type: { summary: 'boolean | "indeterminate"' } },
    },
    defaultChecked: {
      control: "boolean",
      description: "Initial checked state when uncontrolled.",
      table: { type: { summary: "boolean" } },
    },
    onCheckedChange: {
      control: false,
      description: "Called with the new checked state when the box is toggled.",
      table: { type: { summary: "(checked: boolean | 'indeterminate') => void" } },
    },
    disabled: {
      control: "boolean",
      description: "Prevent interaction and dim the box.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: "Accept terms" } };
export const Checked: Story = { args: { label: "Subscribed", defaultChecked: true } };
export const Disabled: Story = { args: { label: "Unavailable", disabled: true } };
export const NoLabel: Story = {
  args: { "aria-label": "Select row" },
  parameters: {
    docs: {
      description: {
        story: "Without a `label`, provide an `aria-label` so the control is announced.",
      },
    },
  },
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-2.5">
      <Checkbox label="Email notifications" defaultChecked />
      <Checkbox label="SMS notifications" />
      <Checkbox label="Push notifications" defaultChecked />
    </div>
  ),
};
