import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "./link";

const meta = {
  title: "Navigation/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A styled anchor for navigation that changes the URL. The default variant grows an underline from the left on hover; \`underline\` is always underlined and \`muted\` is a low-emphasis link.

### When to use
- Navigating to another page, route or external resource.
- Inline links within body text (use \`underline\` for clarity in dense prose).

For an action that does something rather than navigate, use a [Button](/docs/inputs-button--docs) — or render a \`Button\` as an anchor via its \`asChild\` prop when you want button styling on a link.

### Usage
\`\`\`tsx
import { Link } from "@fv/ui";

<Link href="/docs">View documentation</Link>

// Always-underlined, good inside paragraphs
<Link href="/pricing" variant="underline">pricing</Link>

// Low-emphasis
<Link href="/legal" variant="muted">Terms</Link>
\`\`\`

### Accessibility
Renders a native \`<a>\`, so it is keyboard-focusable and follows on Enter. Focus shows a visible underline. Always supply a meaningful \`href\`; for links opening in a new tab add \`target="_blank"\` together with \`rel="noopener noreferrer"\`.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — the link and underline use the accent color, and \`muted\` follows the muted/foreground tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "underline", "muted"],
      description: "Visual treatment of the link.",
      table: {
        type: { summary: '"default" | "underline" | "muted"' },
        defaultValue: { summary: "default" },
      },
    },
    href: { control: "text", description: "Destination URL." },
    children: { control: "text", description: "Link text content." },
  },
  args: { href: "#", children: "View documentation" },
} satisfies Meta<typeof Link>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "The default variant grows an underline from the left on hover." },
    },
  },
};
export const Underline: Story = { args: { variant: "underline" } };
export const Muted: Story = { args: { variant: "muted" } };
