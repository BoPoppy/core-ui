import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextareaField } from "./input";

const meta = {
  title: "Inputs/TextareaField",
  component: TextareaField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The labelled, accessible multi-line field — a \`<label>\` wired to a \`<textarea>\` with built-in hint, error and success messaging. For the bare control without a label, use the exported \`Textarea\`.

### When to use
- Longer, free-form text entry: messages, comments, descriptions.
- Show validation feedback inline via \`error\` or \`success\`, or guidance via \`hint\`.

### Usage
\`\`\`tsx
import { TextareaField } from "@fv/ui";

<TextareaField label="Message" placeholder="A longer message…" hint="Markdown supported." />

// Validation states
<TextareaField label="Message" error="Please add a few more details." />
<TextareaField label="Message" success="Looks good!" />

// Bare control without a label
import { Textarea } from "@fv/ui";
<Textarea placeholder="A longer message…" />
\`\`\`

### Accessibility
The \`label\` is linked to the textarea via \`htmlFor\`/\`id\` (auto-generated when no \`id\` is passed). The hint/error/success message is associated with \`aria-describedby\`, and \`error\` additionally sets \`aria-invalid\`.

### Theming
Shares the input token set, so it re-skins across the **Pebble / Slate / Pop** personalities and light/dark. The control grows from a \`min-height\` and stays vertically resizable.
`.trim(),
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Field label, linked to the textarea via `htmlFor`/`id`.",
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
      description: "Visual state. Overridden by `error`/`success` when those are set.",
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
  args: { label: "Message", placeholder: "A longer message…" },
} satisfies Meta<typeof TextareaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "Markdown supported." } };
export const ErrorState: Story = {
  args: { error: "Please add a few more details.", defaultValue: "Hi" },
};
export const SuccessState: Story = {
  args: { success: "Looks good!", defaultValue: "Thanks for the thorough write-up!" },
};
export const Disabled: Story = { args: { disabled: true, defaultValue: "Locked content" } };

export const States: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <TextareaField label="Default" placeholder="Type here" />
      <TextareaField label="With hint" hint="Helper text" placeholder="Type here" />
      <TextareaField label="Error" error="Required field" />
      <TextareaField label="Success" success="Verified" defaultValue="All good" />
    </div>
  ),
};
