import type { Meta, StoryObj } from "@storybook/react-vite";
import { OTPInput } from "./otp-input";

const meta = {
  title: "Inputs/OTPInput",
  component: OTPInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A segmented **one-time-code** field — one box per digit. It auto-advances as you type, steps back on Backspace, and fills every slot from a single paste.

### When to use
- Verification codes sent by SMS or email, 2FA / MFA challenges, PIN entry.
- Any short fixed-length numeric code where per-digit boxes aid scanning.

For arbitrary text or longer secrets, use a plain \`TextField\` instead.

### Usage
\`\`\`tsx
import { OTPInput } from "@fv/ui";

// Uncontrolled, 6 digits, with a completion callback
<OTPInput onComplete={(code) => verify(code)} />

// Controlled, 4 digits
<OTPInput length={4} value={code} onValueChange={setCode} />
\`\`\`

### Accessibility
The container is a \`role="group"\` labelled by \`aria-label\` (defaults to "One-time code"); each slot is a real \`<input inputMode="numeric">\` with its own \`Digit N\` label. Arrow Left/Right move between slots, Backspace clears and steps back, and a paste fans the code across all slots. Non-digit characters are stripped automatically.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — slot surface, radius, border weight (Pop adds a hard \`fg\` border), the filled-slot accent fill and the focus ring all come from tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    length: {
      control: "number",
      description: "Number of digit slots.",
      table: { type: { summary: "number" }, defaultValue: { summary: "6" } },
    },
    value: {
      control: "text",
      description: "Controlled code string. Provide together with `onValueChange`.",
      table: { type: { summary: "string" } },
    },
    defaultValue: {
      control: "text",
      description: "Initial code when uncontrolled.",
      table: { type: { summary: "string" }, defaultValue: { summary: '""' } },
    },
    onValueChange: {
      control: false,
      description: "Fired with the current code on every change.",
      table: { type: { summary: "(value: string) => void" } },
    },
    onComplete: {
      control: false,
      description: "Fired once when every slot is filled.",
      table: { type: { summary: "(value: string) => void" } },
    },
    disabled: {
      control: "boolean",
      description: "Prevent interaction and dim every slot.",
      table: { defaultValue: { summary: "false" } },
    },
    "aria-label": {
      control: "text",
      description: "Accessible name for the slot group.",
      table: { type: { summary: "string" }, defaultValue: { summary: '"One-time code"' } },
    },
  },
} satisfies Meta<typeof OTPInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Six slots. Type to auto-advance, or paste a code to fill them all at once.",
      },
    },
  },
};
export const FourDigits: Story = { args: { length: 4 } };
export const Prefilled: Story = { args: { defaultValue: "1234" } };
