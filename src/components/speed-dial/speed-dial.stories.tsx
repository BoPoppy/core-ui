import type { Meta, StoryObj } from "@storybook/react-vite";
import { SpeedDial } from "./speed-dial";

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: "Navigation/SpeedDial",
  component: SpeedDial,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A floating action button that fans out a small set of related actions when tapped. The main trigger rotates 45° while open.

### When to use
- Surface a few (roughly 2–5) closely related primary actions from one corner of a screen, typically on touch layouts.

For a single primary action use a [FAB](/docs/inputs-fab--docs); for a longer or context-menu-style list use a [Menu](/docs/navigation-menu--docs).

### Usage
\`\`\`tsx
import { SpeedDial } from "@fv/ui";

<SpeedDial
  actions={[
    { label: "Edit", icon: <EditIcon />, onClick: edit },
    { label: "Share", icon: <ShareIcon />, onClick: share },
    { label: "Delete", icon: <TrashIcon />, onClick: remove },
  ]}
  direction="up"
/>
\`\`\`

### Accessibility
The trigger is a \`<button>\` with \`aria-expanded\` reflecting open state and an \`aria-label\` (default \`"Actions"\`). Each fanned-out action is a \`<button>\` labelled by its \`label\` via \`aria-label\`. Clicking outside closes the menu.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — the trigger uses accent colours and becomes a rounded square in Pop; action buttons and elevation derive from tokens.
`.trim(),
      },
    },
  },
  args: { actions: [] },
  argTypes: {
    actions: {
      control: false,
      description: "The fanned-out actions; each has an `icon`, `label`, and `onClick`.",
      table: { type: { summary: "SpeedDialAction[]" } },
    },
    icon: {
      control: false,
      description: "Icon for the main trigger (rotates 45° when open). Defaults to a plus.",
      table: { type: { summary: "React.ReactNode" } },
    },
    direction: {
      control: "inline-radio",
      options: ["up", "down"],
      description: "Direction the actions fan out from the trigger.",
      table: { type: { summary: '"up" | "down"' }, defaultValue: { summary: "up" } },
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for the main trigger button.",
      table: { type: { summary: "string" }, defaultValue: { summary: '"Actions"' } },
    },
  },
} satisfies Meta<typeof SpeedDial>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Tap the trigger to fan out the actions; the plus rotates 45° while open.",
      },
    },
  },
  render: () => (
    // The fanned-out actions are absolutely positioned, so they float above the
    // trigger without needing reserved layout space — keep the preview compact.
    <div className="flex justify-center py-6">
      <SpeedDial
        actions={[
          {
            label: "Edit",
            icon: icon("M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"),
            onClick: () => {},
          },
          {
            label: "Share",
            icon: icon("M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"),
            onClick: () => {},
          },
          { label: "Delete", icon: icon("M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"), onClick: () => {} },
        ]}
      />
    </div>
  ),
};
