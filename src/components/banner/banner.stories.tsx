import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Banner } from "./banner";

const meta = {
  title: "Feedback/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A page-level message bar for prominent, persistent announcements — plan limits, system notices, or "new version available" prompts — typically spanning the top of a view. Supports an optional icon, secondary description, trailing actions, and a dismiss button.

### When to use
- Communicate a broad, page- or app-level message that warrants attention.
- Pair a message with a primary action (e.g. "Upgrade", "Reload").

For inline, contextual status next to specific content, use Alert. For transient notifications, use Toast.

### Usage
\`\`\`tsx
import { Banner, Button } from "@fv/ui";

<Banner
  action={<Button size="sm" variant="secondary">Upgrade</Button>}
  onClose={dismiss}
>
  You're on the free plan.
</Banner>

// Subtle variant with a secondary description line
<Banner variant="subtle" description="Restart to apply the update.">
  A new version is available.
</Banner>
\`\`\`

### Accessibility
The dismiss button (rendered when \`onClose\` is set) carries \`aria-label="Dismiss"\`. The Banner itself has no implicit role; if it announces an important status, add \`role="status"\` or \`role="alert"\` via props. Place interactive \`action\` content in a logical reading/tab order after the message.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — the solid (accent) and subtle (accent-soft) variants, border weight/color, and radius all derive from theme variables.
`.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["solid", "subtle"],
      description: "Emphasis — accent-filled `solid` or low-key `subtle`.",
      table: { type: { summary: '"solid" | "subtle"' }, defaultValue: { summary: "solid" } },
    },
    description: { control: "text", description: "Secondary line rendered below the main text." },
    icon: { control: false, description: "Optional leading icon node." },
    action: { control: false, description: "Trailing action content, e.g. buttons." },
    onClose: {
      control: false,
      description: "When provided, renders a dismiss button and is called on click.",
    },
    children: { control: "text", description: "Primary message content." },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  render: () => (
    <Banner
      className="w-[560px]"
      action={
        <Button size="sm" variant="secondary">
          Upgrade
        </Button>
      }
      onClose={() => {}}
    >
      You're on the free plan.
    </Banner>
  ),
};

export const Subtle: Story = {
  parameters: {
    docs: {
      description: {
        story: "The `subtle` variant pairs a muted background with a `description` line.",
      },
    },
  },
  render: () => (
    <Banner
      className="w-[560px]"
      variant="subtle"
      description="Restart to apply the update."
      onClose={() => {}}
    >
      A new version is available.
    </Banner>
  ),
};
