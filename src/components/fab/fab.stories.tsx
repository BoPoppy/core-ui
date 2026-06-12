import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fab } from "./fab";

const Plus = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const meta = {
  title: "Inputs/FAB",
  component: Fab,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A **Floating Action Button** — a high-emphasis, circular button for the single most important action on a screen, typically pinned to a corner (e.g. "compose", "add", "new").

### When to use
- Promote one primary, constructive action per screen.
- On touch/mobile layouts where a persistent, thumb-reachable action helps.

Use a regular [Button](/docs/inputs-button--docs) for anything that lives inline with content, and avoid showing more than one FAB at a time. For a FAB that fans out into several actions, see [SpeedDial](/docs/inputs-speeddial--docs).

### Usage
\`\`\`tsx
import { Fab } from "@fv/ui";

// Icon-only — always label it for screen readers
<Fab aria-label="Add item"><PlusIcon /></Fab>

// Extended: icon + text pill
<Fab extended><PlusIcon /> Create</Fab>
\`\`\`

### Accessibility
Renders a native \`<button type="button">\`. Icon-only FABs **must** have an \`aria-label\`; the extended variant is labelled by its visible text.

### Theming
The corner shape follows the active personality — a circle in **Pebble**, softer rounded squares in **Slate** and **Pop** — and elevation/press come from tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
      description: "Diameter of the icon-only button.",
      table: { type: { summary: '"sm" | "md"' }, defaultValue: { summary: "md" } },
    },
    extended: {
      control: "boolean",
      description: "Render a wider pill that fits an icon plus a text label.",
      table: { defaultValue: { summary: "false" } },
    },
    children: { control: false, description: "Icon, or icon + label when `extended`." },
  },
} satisfies Meta<typeof Fab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: <Plus />, "aria-label": "Add" } };
export const Small: Story = { args: { size: "sm", children: <Plus />, "aria-label": "Add" } };
export const Extended: Story = {
  args: {
    extended: true,
    children: (
      <>
        <Plus />
        Create
      </>
    ),
  },
};
