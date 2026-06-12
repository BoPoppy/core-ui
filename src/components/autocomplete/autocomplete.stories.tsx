import type { Meta, StoryObj } from "@storybook/react-vite";
import { Autocomplete } from "./autocomplete";

const meta = {
  title: "Inputs/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A single-select combobox: a text input that filters a list of options as the user types and lets them pick one with the keyboard or mouse. Works in both controlled and uncontrolled modes.

### When to use
- Let users narrow a moderate-to-large list of string options by typing.
- Free-text-driven selection where filtering beats scrolling a long Select.

For a fixed, short list of choices, a Select is simpler. For multi-value entry, see TagInput.

### Usage
\`\`\`tsx
import { Autocomplete } from "@fv/ui";

// Uncontrolled
<Autocomplete options={["Apple", "Banana", "Cherry"]} aria-label="Fruit" />

// Controlled
<Autocomplete
  options={fruits}
  value={value}
  onValueChange={setValue}
  emptyMessage="No matches"
/>
\`\`\`

### Accessibility
The input uses the combobox pattern: \`role="combobox"\` with \`aria-expanded\`, \`aria-controls\`, and \`aria-autocomplete="list"\`; the popup is \`role="listbox"\` with \`role="option"\` items and \`aria-selected\`. Keyboard: ↑/↓ move the active option, Enter chooses it, Escape closes the list. Provide a meaningful \`aria-label\` (defaults to "Autocomplete").

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — input border, focus ring, surface, radius, and the active-option highlight all derive from theme variables.
`.trim(),
      },
    },
  },
  argTypes: {
    options: { control: "object", description: "The list of selectable string options." },
    value: { control: "text", description: "Controlled input/selection value." },
    defaultValue: {
      control: "text",
      description: "Initial value in uncontrolled mode.",
      table: { defaultValue: { summary: '""' } },
    },
    onValueChange: {
      control: false,
      description: "Called with the new value as the user types or selects.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the empty input.",
      table: { defaultValue: { summary: '"Search…"' } },
    },
    emptyMessage: {
      control: "text",
      description: "Message shown when no option matches.",
      table: { defaultValue: { summary: '"No matches"' } },
    },
    disabled: {
      control: "boolean",
      description: "Disable the input.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    options: ["Apple", "Banana", "Blueberry", "Cherry", "Grape", "Mango", "Orange", "Peach"],
  },
} satisfies Meta<typeof Autocomplete>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { className: "w-72" } };
