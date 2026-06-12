import type { Meta, StoryObj } from "@storybook/react-vite";
import { List, ListItem } from "./list";

const Dot = () => <span className="size-2.5 rounded-full bg-accent" />;

const meta = {
  title: "Data display/List",
  component: List,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A bordered, elevated container (\`List\`) for a vertical stack of \`ListItem\` rows. Each item supports a leading icon, a title, a subtitle and trailing meta content, with dividers between rows.

### When to use
- Displaying a compact set of records: inboxes, settings rows, recent activity.
- When rows are simple and uniform. For tabular data with columns, use a [Table](/docs/data-display-table--docs) instead.

### Usage
\`\`\`tsx
import { List, ListItem } from "@fv/ui";

<List>
  <ListItem icon={<InboxIcon />} title="Inbox" subtitle="12 new messages" meta="2m" />
  <ListItem icon={<DraftIcon />} title="Drafts" subtitle="3 saved" meta="1h" />
</List>
\`\`\`

### Accessibility
Renders a semantic \`<ul>\` with \`<li>\` items, so screen readers announce list size and position. The hover styling is purely visual — if rows are interactive, place a real control (link or button) inside the item or wire up \`onClick\` with appropriate semantics.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — the container border/elevation and the icon badge shape (a circle in Pebble, rounded square elsewhere) follow the active personality.
`.trim(),
      },
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Each `ListItem` takes an `icon`, `title`, `subtitle` and trailing `meta`; dividers between rows are automatic.",
      },
    },
  },
  render: () => (
    <List className="w-80">
      <ListItem icon={<Dot />} title="Inbox" subtitle="12 new messages" meta="2m" />
      <ListItem icon={<Dot />} title="Drafts" subtitle="3 saved" meta="1h" />
      <ListItem icon={<Dot />} title="Sent" subtitle="Last sent yesterday" meta="1d" />
    </List>
  ),
};
