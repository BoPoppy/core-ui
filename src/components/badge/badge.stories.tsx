import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";

const meta = {
  title: "Data display/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A small inline label for status, counts, or categorization — e.g. "Active", "Beta", or an item count next to a heading.

### When to use
- Tag an item with a short status or category.
- Show a small count or state indicator alongside text.

For dismissible, user-managed chips, use TagInput's tags; for high-emphasis call-to-action pills, use a Button.

### Usage
\`\`\`tsx
import { Badge } from "@fv/ui";

<Badge variant="accent">Beta</Badge>

// Leading status dot in the current text color
<Badge variant="success" dot>Online</Badge>
\`\`\`

### Accessibility
Renders a plain \`<span>\` with no implicit role, so the text content carries the meaning — keep labels self-explanatory. The leading \`dot\` is decorative (\`aria-hidden\`). If a badge conveys live status, consider an adjacent visually-hidden label or an \`aria-label\` on the surrounding control rather than relying on color alone.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — fill, text color, border, and shape (pill in Pebble, rounded square otherwise) all derive from theme variables.
`.trim(),
      },
    },
  },
  args: { children: "Badge", variant: "neutral" },
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "accent", "success", "danger"],
      description: "Color/intent of the badge.",
      table: {
        type: { summary: '"neutral" | "accent" | "success" | "danger"' },
        defaultValue: { summary: "neutral" },
      },
    },
    dot: {
      control: "boolean",
      description: "Render a small leading status dot in the current text color.",
      table: { defaultValue: { summary: "false" } },
    },
    children: { control: "text", description: "Badge label content." },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Accent: Story = { args: { variant: "accent" } };
export const WithDot: Story = {
  args: { variant: "success", dot: true, children: "Online" },
  parameters: {
    docs: {
      description: { story: "`dot` adds a decorative status dot tinted to match the text." },
    },
  },
};

export const All: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Neutral</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success" dot>
        Active
      </Badge>
      <Badge variant="danger" dot>
        Error
      </Badge>
    </div>
  ),
};
