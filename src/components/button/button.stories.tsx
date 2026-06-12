import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta = {
  title: "Inputs/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
The primary way to trigger an action — submitting a form, opening a dialog, confirming a choice.

### When to use
- **Primary** — the single most important action on a view (one per section is ideal).
- **Secondary** — supporting actions that sit alongside a primary button.
- **Ghost** — low-emphasis actions in dense UIs, toolbars, or table rows.
- **Danger** — destructive actions such as delete or remove. Pair with a confirmation step.

For navigation that changes the URL, prefer a [Link](/docs/navigation-link--docs) styled as a button via \`asChild\` rather than a button with an \`onClick\` that navigates.

### Usage
\`\`\`tsx
import { Button } from "@fv/ui";

<Button variant="primary" onClick={save}>Save changes</Button>

// Loading state blocks interaction and shows a spinner
<Button loading>Saving…</Button>

// Render as another element (e.g. an anchor) with asChild
<Button asChild>
  <a href="/pricing">View pricing</a>
</Button>
\`\`\`

### Accessibility
- Renders a native \`<button>\`, so it is keyboard-focusable and fires on Enter/Space out of the box.
- \`loading\` sets \`aria-busy\` and disables the button; \`disabled\` sets \`aria-disabled\` when used with \`asChild\`.
- For icon-only buttons always provide an \`aria-label\`.

### Theming
Re-skins automatically across the **Pebble / Slate / Pop** personalities and light/dark themes — colors, radius, border weight and the press animation all come from CSS tokens. Use the toolbar above to preview.
`.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
      description: "Visual emphasis and intent of the button.",
      table: {
        type: { summary: '"primary" | "secondary" | "ghost" | "danger"' },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "Control height and horizontal padding.",
      table: { type: { summary: '"sm" | "md" | "lg"' }, defaultValue: { summary: "md" } },
    },
    loading: {
      control: "boolean",
      description: "Show a spinner and block interaction. Sets `aria-busy`.",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: { control: "boolean", description: "Prevent interaction and dim the button." },
    asChild: {
      control: false,
      description:
        "Merge props onto the single child element instead of rendering a `<button>` (Radix Slot). Use to render an `<a>`.",
      table: { defaultValue: { summary: "false" } },
    },
    children: { control: "text", description: "Button label and/or icon content." },
  },
  args: { children: "Button", variant: "primary", size: "md" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Danger: Story = { args: { variant: "danger" } };
export const Loading: Story = {
  args: { loading: true, children: "Saving…" },
  parameters: {
    docs: {
      description: {
        story: "While `loading`, the button shows a spinner, sets `aria-busy`, and ignores clicks.",
      },
    },
  },
};
export const Disabled: Story = { args: { disabled: true } };

export const Variants: Story = {
  parameters: {
    docs: { description: { story: "All four intents side by side." } },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const AsLink: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "With `asChild`, the button styling is applied to its child — here an `<a>` that navigates.",
      },
    },
  },
  render: () => (
    <Button asChild>
      <a href="https://example.com">I am an anchor</a>
    </Button>
  ),
};
