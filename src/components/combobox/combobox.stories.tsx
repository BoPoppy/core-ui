import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox } from "./combobox";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "angular", label: "Angular" },
];

const meta = {
  title: "Inputs/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A multi-select dropdown — choose several options from a list, with the selected values shown as removable chips in the trigger.

### When to use
- Picking **multiple** values from a known set (tags, frameworks, assignees).
- When selections should stay visible and be removable one at a time.

For a single choice prefer a Select, and for free-text entry of arbitrary tags reach for TagInput.

### Usage
\`\`\`tsx
import { Combobox } from "@fv/ui";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];

// Uncontrolled
<Combobox options={options} defaultValue={["react"]} aria-label="Frameworks" />

// Controlled
<Combobox options={options} value={selected} onValueChange={setSelected} />
\`\`\`

### Accessibility
- The trigger is a \`<button>\` with \`aria-haspopup="listbox"\`, \`aria-expanded\`, and \`aria-controls\` pointing at the popup.
- The popup is \`role="listbox"\` with \`aria-multiselectable\`; each option is \`role="option"\` with \`aria-selected\`.
- Each chip has a labelled "Remove {label}" control; provide an \`aria-label\` for the trigger (defaults to "Multi-select"). Clicking outside closes the list.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — chip shape, border weight and focus ring all follow the active theme.
`.trim(),
      },
    },
  },
  argTypes: {
    options: {
      control: false,
      description: "Selectable items, each `{ value, label }`.",
      table: { type: { summary: "ComboboxOption[]" } },
    },
    value: {
      control: false,
      description: "Controlled list of selected values. Pair with `onValueChange`.",
      table: { type: { summary: "string[]" } },
    },
    defaultValue: {
      control: false,
      description: "Initial selection when uncontrolled.",
      table: { type: { summary: "string[]" }, defaultValue: { summary: "[]" } },
    },
    onValueChange: {
      control: false,
      description: "Called with the new array of selected values whenever selection changes.",
      table: { type: { summary: "(value: string[]) => void" } },
    },
    placeholder: {
      control: "text",
      description: "Text shown in the trigger when nothing is selected.",
      table: { type: { summary: "string" }, defaultValue: { summary: '"Select…"' } },
    },
    disabled: {
      control: "boolean",
      description: "Prevent interaction and dim the trigger.",
      table: { defaultValue: { summary: "false" } },
    },
    "aria-label": {
      control: "text",
      description: "Accessible name for the trigger button.",
      table: { type: { summary: "string" }, defaultValue: { summary: '"Multi-select"' } },
    },
  },
  args: { options },
} satisfies Meta<typeof Combobox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: ["react"], className: "w-72" },
  parameters: {
    docs: {
      description: { story: "Pre-selected values render as removable chips in the trigger." },
    },
  },
};
export const Empty: Story = { args: { placeholder: "Pick frameworks…", className: "w-72" } };
