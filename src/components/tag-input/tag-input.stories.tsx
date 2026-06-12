import type { Meta, StoryObj } from "@storybook/react-vite";
import { TagInput } from "./tag-input";

const meta = {
  title: "Inputs/TagInput",
  component: TagInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A free-form multi-value field: the user types a token, presses Enter or comma to commit it as a chip, and Backspace on an empty field removes the last one.

### When to use
- Collecting an open-ended list of short values — tags, skills, recipient emails, keywords.
- When the set of options is unbounded and the user defines the values.

For choosing from a known, finite list prefer a multi-select; for a single short value use a plain text input.

### Usage
\`\`\`tsx
import { TagInput } from "@fv/ui";

// Uncontrolled with seed values
<TagInput defaultValue={["react", "typescript"]} />

// Controlled
<TagInput value={tags} onValueChange={setTags} placeholder="Add skills…" />
\`\`\`

### Accessibility
- The text \`<input>\` carries an \`aria-label\` (defaults to "Tags"); pass \`aria-label\` to override.
- Each chip's remove button is a real \`<button>\` labelled "Remove {tag}".
- Keyboard: **Enter** or **,** commits the draft, **Backspace** on an empty field deletes the last chip.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — chip fill, border weight, focus ring, and the pill radius (fully rounded in Pebble).
`.trim(),
      },
    },
  },
  argTypes: {
    value: {
      control: false,
      description: "Controlled list of tags. Pair with `onValueChange`.",
      table: { type: { summary: "string[]" } },
    },
    defaultValue: {
      control: false,
      description: "Initial tags when uncontrolled.",
      table: { type: { summary: "string[]" }, defaultValue: { summary: "[]" } },
    },
    onValueChange: {
      control: false,
      description: "Called with the next tag array whenever a tag is added or removed.",
      table: { type: { summary: "(tags: string[]) => void" } },
    },
    placeholder: {
      control: "text",
      description: "Shown only while there are no tags.",
      table: { type: { summary: "string" }, defaultValue: { summary: '"Add tags…"' } },
    },
    dedupe: {
      control: "boolean",
      description: "Reject case-insensitive duplicate tags.",
      table: { defaultValue: { summary: "true" } },
    },
    disabled: {
      control: "boolean",
      description: "Prevent typing and removing chips.",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof TagInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: ["react", "typescript"], className: "w-80" },
  parameters: {
    docs: {
      description: {
        story:
          "Type and press Enter or comma to add a chip; Backspace on an empty field removes the last.",
      },
    },
  },
};
export const Empty: Story = { args: { placeholder: "Add skills…", className: "w-80" } };
