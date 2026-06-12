import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumbs } from "./breadcrumbs";

const meta = {
  title: "Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A breadcrumb trail showing the path to the current page within a hierarchy. The last item is rendered as the current page; earlier items are links back up the tree.

### When to use
- Deep, hierarchical navigation where users benefit from seeing and jumping back to ancestor pages.
- As secondary navigation near the top of a content view — not as the primary nav.

For switching between peer views rather than ancestors, use [Tabs](/docs/navigation-tabs--docs).

### Usage
\`\`\`tsx
import { Breadcrumbs } from "@fv/ui";

<Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Atlas" },
  ]}
/>

// Custom separator
<Breadcrumbs separator="›" items={items} />
\`\`\`

### Accessibility
- Renders a \`<nav aria-label="Breadcrumb">\`. The final crumb gets \`aria-current="page"\`; an item without an \`href\` is rendered as plain text rather than a link.
- Separators are decorative and marked \`aria-hidden\`.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark themes — link, muted and current-page colors all come from CSS tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    items: {
      control: false,
      description:
        "Ordered list of crumbs from root to current page. Each item is `{ label, href? }`; the last item is shown as the current page and items without `href` render as plain text.",
      table: { type: { summary: "Crumb[]" } },
    },
    separator: {
      control: "text",
      description: "Node rendered between crumbs.",
      table: { type: { summary: "React.ReactNode" }, defaultValue: { summary: '"/"' } },
    },
  },
} satisfies Meta<typeof Breadcrumbs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [{ label: "Home", href: "#" }, { label: "Projects", href: "#" }, { label: "Atlas" }],
  },
};
