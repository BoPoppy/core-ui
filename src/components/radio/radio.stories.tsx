import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, RadioGroup } from "./radio";

const meta = {
  title: "Inputs/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A set of mutually exclusive options where exactly one can be selected at a time. \`RadioGroup\` is the container; each \`Radio\` is one option.

### When to use
- A small, fixed list of options (roughly 2–6) where seeing every choice at once helps.
- When only one value may be chosen.

For many options use a [Select](/docs/inputs-select--docs) instead, and for independent on/off choices use a Checkbox or Switch.

### Usage
\`\`\`tsx
import { Radio, RadioGroup } from "@fv/ui";

<RadioGroup defaultValue="standard" onValueChange={setShipping}>
  <Radio value="standard" label="Standard shipping" />
  <Radio value="express" label="Express shipping" />
  <Radio value="pickup" label="In-store pickup" disabled />
</RadioGroup>
\`\`\`

### Accessibility
Built on [Radix RadioGroup](https://www.radix-ui.com/primitives/docs/components/radio-group), so it inherits roving-tabindex keyboard support — arrow keys move and select between options, Tab moves in/out of the group. Each \`Radio\` with a \`label\` is associated to it via \`<label htmlFor>\` / \`aria-labelledby\`; for a label-less \`Radio\` pass your own \`aria-label\`.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — the dot, border weight, accent fill and focus ring all derive from tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: false,
      description: "Initial selected value for uncontrolled usage.",
      table: { type: { summary: "string" } },
    },
    value: {
      control: false,
      description: "Selected value for controlled usage.",
      table: { type: { summary: "string" } },
    },
    onValueChange: {
      control: false,
      description: "Called with the new value when the selection changes.",
      table: { type: { summary: "(value: string) => void" } },
    },
    disabled: {
      control: "boolean",
      description: "Disable every option in the group.",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Each `Radio` takes a `value` and an optional `label`; pass `disabled` to grey out one option.",
      },
    },
  },
  render: () => (
    <RadioGroup defaultValue="standard">
      <Radio value="standard" label="Standard shipping" />
      <Radio value="express" label="Express shipping" />
      <Radio value="overnight" label="Overnight" />
      <Radio value="pickup" label="In-store pickup" disabled />
    </RadioGroup>
  ),
};
