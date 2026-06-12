import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./select";

const meta = {
  title: "Inputs/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A styled native \`<select>\` for choosing one option from a list, with an optional label, hint, and error message. Because it wraps the real element it keeps native keyboard support and the OS picker on mobile.

### When to use
- Pick a single value from a moderately long list (countries, categories) where a dropdown saves space.

For a short fixed set of options use a [RadioGroup](/docs/inputs-radiogroup--docs); for free text use an Input.

### Usage
\`\`\`tsx
import { Select } from "@fv/ui";

<Select label="Country" hint="Where should we ship?" onChange={onChange}>
  <option value="us">United States</option>
  <option value="vn">Vietnam</option>
</Select>

// Validation
<Select label="Country" error="Please choose a country.">
  {/* options */}
</Select>
\`\`\`

### Accessibility
Renders a real \`<select>\`, so keyboard and screen-reader behaviour are native. The visible \`label\` is tied to the field via \`htmlFor\`/\`id\`; \`hint\` and \`error\` are exposed through \`aria-describedby\`, and \`error\` also sets \`aria-invalid\`.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — border weight, radius, focus ring, the chevron, and the danger state all derive from tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Visible label tied to the field via `htmlFor`/`id`.",
      table: { type: { summary: "string" } },
    },
    hint: {
      control: "text",
      description: "Helper text shown below the field (exposed via `aria-describedby`).",
      table: { type: { summary: "string" } },
    },
    error: {
      control: "text",
      description:
        "Error message; styles the field as invalid and sets `aria-invalid`. Takes precedence over `hint`.",
      table: { type: { summary: "string" } },
    },
    disabled: {
      control: "boolean",
      description: "Prevent interaction and dim the field.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: { label: "Country" },
  render: (args) => (
    <Select {...args}>
      <option value="us">United States</option>
      <option value="vn">Vietnam</option>
      <option value="jp">Japan</option>
      <option value="de">Germany</option>
    </Select>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "Where should we ship?" } };
export const ErrorState: Story = {
  args: { error: "Please choose a country." },
  parameters: {
    docs: {
      description: {
        story: "`error` styles the field as invalid, sets `aria-invalid`, and replaces any `hint`.",
      },
    },
  },
};
export const Disabled: Story = { args: { disabled: true } };
