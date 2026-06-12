import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stepper } from "./stepper";

const meta = {
  title: "Navigation/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A horizontal progress indicator that shows where a user is within a sequence of labelled steps. Steps before the current one render as done (with a check), the current one is highlighted, and later steps are muted.

### When to use
- Communicate progress through a multi-step flow such as checkout or onboarding.

This is a display-only indicator — it does not own navigation. Drive \`current\` from your flow state and render the actual step content yourself.

### Usage
\`\`\`tsx
import { Stepper } from "@fv/ui";

<Stepper
  current={step}
  steps={[
    { label: "Cart" },
    { label: "Shipping" },
    { label: "Payment" },
    { label: "Done" },
  ]}
/>
\`\`\`

### Accessibility
Renders text labels and a check glyph for completed steps; the connector lines and icons are decorative. As it is presentational, announce the active step to assistive tech from your surrounding flow (e.g. a heading or a live region) rather than relying on the indicator alone.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — the done/active/upcoming step colours, border weight, and the focus-ring-style highlight on the active step all derive from tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    steps: {
      control: false,
      description: "The ordered steps to display; each has a `label`.",
      table: { type: { summary: "Step[]" } },
    },
    current: {
      control: { type: "number" },
      description: "Index of the current (active) step. Earlier steps render as done.",
      table: { type: { summary: "number" } },
    },
  },
} satisfies Meta<typeof Stepper>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    current: 1,
    steps: [{ label: "Cart" }, { label: "Shipping" }, { label: "Payment" }, { label: "Done" }],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Steps before `current` show a check, `current` is highlighted, and later steps are muted.",
      },
    },
  },
};
