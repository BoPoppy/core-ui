import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./switch";

const meta = {
  title: "Inputs/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A pill toggle for a single on/off setting that takes effect immediately — Wi-Fi, notifications, dark mode.

### When to use
- Toggling a binary state that applies instantly, without a separate save step.
- One independent setting per switch.

For a choice the user must submit with the rest of a form, prefer a Checkbox. For picking one of several mutually exclusive options, use a RadioGroup.

### Usage
\`\`\`tsx
import { Switch } from "@fv/ui";

// Inline label sits to the right of the track
<Switch label="Airplane mode" />

// Controlled
<Switch checked={enabled} onCheckedChange={setEnabled} label="Wi-Fi" />

// No visible label — always pass an aria-label
<Switch aria-label="Toggle" />
\`\`\`

### Accessibility
- Built on [Radix Switch](https://www.radix-ui.com/primitives/docs/components/switch), so it has \`role="switch"\`, \`aria-checked\`, and full keyboard support (Space/Enter to toggle) out of the box.
- With a \`label\` the track is wired up via \`aria-labelledby\` and the wrapping \`<label htmlFor>\`. Without one, pass an \`aria-label\`.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — track, accent fill, border weight and focus ring.
`.trim(),
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Optional inline label rendered to the right of the track.",
      table: { type: { summary: "ReactNode" } },
    },
    checked: {
      control: "boolean",
      description: "Controlled on/off state. Pair with `onCheckedChange`.",
    },
    defaultChecked: {
      control: "boolean",
      description: "Initial state when uncontrolled.",
      table: { defaultValue: { summary: "false" } },
    },
    onCheckedChange: {
      control: false,
      description: "Called with the new boolean state when toggled.",
      table: { type: { summary: "(checked: boolean) => void" } },
    },
    disabled: {
      control: "boolean",
      description: "Prevent interaction and dim the switch.",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: "Airplane mode" } };
export const On: Story = { args: { label: "Wi-Fi", defaultChecked: true } };
export const Disabled: Story = { args: { label: "Locked", disabled: true } };
export const NoLabel: Story = {
  args: { "aria-label": "Toggle" },
  parameters: {
    docs: {
      description: {
        story: "Without a `label`, supply an `aria-label` so screen readers can name the control.",
      },
    },
  },
};
