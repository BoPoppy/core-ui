import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField } from "./input";

const meta = {
  title: "Inputs/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The labelled, accessible text field — a \`<label>\` wired to an input with built-in hint, error and success messaging. For the bare control without a label, use the exported \`Input\`.

### When to use
- Any single-line text entry on a form: email, name, search, etc.
- Show validation feedback inline via \`error\` or \`success\`, or guidance via \`hint\`.

### Usage
\`\`\`tsx
import { TextField } from "@fv/ui";

<TextField label="Email" placeholder="you@example.com" hint="We'll never share it." />

// Validation states
<TextField label="Email" error="That email is already taken." />
<TextField label="Email" success="Looks good!" />

// Bare control without a label
import { Input } from "@fv/ui";
<Input placeholder="Search…" />
\`\`\`

### Accessibility
The \`label\` is linked to the input via \`htmlFor\`/\`id\` (auto-generated when no \`id\` is passed). The hint/error/success message is associated with \`aria-describedby\`, and \`error\` additionally sets \`aria-invalid\`. Disabled inputs use the native \`disabled\` attribute.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — border weight, radius, focus ring and the error/success ring colors all come from tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Field label, linked to the input via `htmlFor`/`id`.",
      table: { type: { summary: "string" } },
    },
    hint: {
      control: "text",
      description: "Helper text below the field. Replaced by `error`/`success` when set.",
      table: { type: { summary: "string" } },
    },
    error: {
      control: "text",
      description: "Error message; forces the error state and sets `aria-invalid`.",
      table: { type: { summary: "string" } },
    },
    success: {
      control: "text",
      description: "Success message; forces the success state.",
      table: { type: { summary: "string" } },
    },
    state: {
      control: "inline-radio",
      options: ["default", "error", "success"],
      description: "Visual state of the input. Overridden by `error`/`success` when those are set.",
      table: {
        type: { summary: '"default" | "error" | "success"' },
        defaultValue: { summary: "default" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Prevent interaction and dim the field.",
      table: { type: { summary: "boolean" } },
    },
    placeholder: { control: "text", description: "Placeholder text shown when empty." },
  },
  args: { label: "Email", placeholder: "you@example.com" },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "We'll never share it." } };
export const ErrorState: Story = {
  args: { error: "That email is already taken.", defaultValue: "x@y" },
  parameters: {
    docs: {
      description: {
        story:
          "Passing `error` forces the error state, sets `aria-invalid`, and shows the message in the danger color.",
      },
    },
  },
};
export const SuccessState: Story = {
  args: { success: "Looks good!", defaultValue: "me@fv.dev" },
};
export const Disabled: Story = { args: { disabled: true, defaultValue: "locked@fv.dev" } };

export const States: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <TextField label="Default" placeholder="Type here" />
      <TextField label="With hint" hint="Helper text" placeholder="Type here" />
      <TextField label="Error" error="Required field" />
      <TextField label="Success" success="Verified" defaultValue="ok@fv.dev" />
    </div>
  ),
};
