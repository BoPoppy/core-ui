import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Pagination } from "./pagination";

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A numeric page switcher with **previous / next** controls and ellipsis truncation, for navigating long lists or tables split across pages.

### When to use
- Server- or client-paginated tables and result lists where the user wants to jump to a specific page.
- When the total page \`count\` is known and shown to the user.

For incrementally loading more rows in place, prefer a "Load more" \`Button\` or infinite scroll instead.

### Usage
\`\`\`tsx
import { Pagination } from "@fv/ui";

const [page, setPage] = useState(1);

<Pagination page={page} count={10} onPageChange={setPage} />

// Show more neighbours around the current page
<Pagination page={page} count={50} siblings={2} onPageChange={setPage} />
\`\`\`

### Accessibility
Renders a \`<nav aria-label="Pagination">\` containing native \`<button>\`s. The current page button gets \`aria-current="page"\`; each page is labelled \`Page N\`, and the arrows are labelled "Previous page" / "Next page" and disable at the first/last page. Buttons are fully keyboard-operable.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — page chips are pill-shaped in Pebble, the active page uses the accent color, and Pop adds a hard \`fg\` border.
`.trim(),
      },
    },
  },
  args: { page: 1, count: 10, onPageChange: () => {} },
  argTypes: {
    page: {
      control: "number",
      description: "Current page (1-based).",
      table: { type: { summary: "number" } },
    },
    count: {
      control: "number",
      description: "Total number of pages.",
      table: { type: { summary: "number" } },
    },
    onPageChange: {
      control: false,
      description: "Fired with the target page when a page or arrow is clicked.",
      table: { type: { summary: "(page: number) => void" } },
    },
    siblings: {
      control: "number",
      description: "How many pages to show on each side of the current one before truncating.",
      table: { type: { summary: "number" }, defaultValue: { summary: "1" } },
    },
  },
} satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Ten pages with the current page in the middle, showing first/last anchors and ellipsis truncation.",
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(4);
    return <Pagination page={page} count={10} onPageChange={setPage} />;
  },
};
