import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarGroup } from "./avatar";

const meta = {
  title: "Data display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A compact representation of a user or entity — an image with an initials/icon fallback, an optional presence status dot, and an \`AvatarGroup\` for stacking several with overlap.

### When to use
- Represent a person or org in lists, headers, comments, and menus.
- Show presence with the \`status\` dot, or collapse a set of people with \`AvatarGroup\`.

### Usage
\`\`\`tsx
import { Avatar, AvatarGroup } from "@fv/ui";

// Image with initials fallback
<Avatar src={user.photo} alt={user.name} fallback="TV" />

// Presence + accent variant
<Avatar fallback="AC" variant="accent" status="online" />

// Overlapping stack
<AvatarGroup>
  <Avatar fallback="AB" />
  <Avatar fallback="CD" />
  <Avatar fallback="+5" />
</AvatarGroup>
\`\`\`

### Accessibility
The image uses \`alt\` for its description (empty string when omitted, treating it as decorative). The status dot is exposed as \`role="img"\` with an \`aria-label\` of the status ("online" / "busy" / "offline"). Provide initials or an icon via \`fallback\` so the avatar is still meaningful when no image loads.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — shape (circular in Pebble, rounded square in Slate), border weight/color, and accent fill all derive from theme variables.
`.trim(),
      },
    },
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Diameter of the avatar.",
      table: {
        type: { summary: '"xs" | "sm" | "md" | "lg" | "xl"' },
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: "inline-radio",
      options: ["neutral", "accent"],
      description: "Surface treatment — neutral fill or accent color.",
      table: { type: { summary: '"neutral" | "accent"' }, defaultValue: { summary: "neutral" } },
    },
    status: {
      control: "inline-radio",
      options: ["online", "busy", "offline"],
      description: "Optional presence dot in the bottom-right corner.",
      table: { type: { summary: '"online" | "busy" | "offline"' } },
    },
    src: {
      control: "text",
      description: "Image URL; falls back to initials/children when absent.",
    },
    alt: { control: "text", description: "Alt text for the image." },
    fallback: {
      control: "text",
      description: "Content (e.g. initials) shown when there's no image.",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = { args: { fallback: "TV" } };
export const Accent: Story = { args: { fallback: "AC", variant: "accent" } };
export const WithStatus: Story = {
  args: { fallback: "ON", status: "online" },
  parameters: {
    docs: {
      description: { story: 'The `status` dot is announced via `role="img"` and an `aria-label`.' },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar size="xs" fallback="XS" />
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
    </div>
  ),
};

export const Group: Story = {
  parameters: {
    docs: {
      description: { story: "`AvatarGroup` overlaps its children; each lifts slightly on hover." },
    },
  },
  render: () => (
    <AvatarGroup>
      <Avatar fallback="AB" />
      <Avatar fallback="CD" variant="accent" />
      <Avatar fallback="EF" />
      <Avatar fallback="+5" className="bg-accent-soft text-fg" />
    </AvatarGroup>
  ),
};
