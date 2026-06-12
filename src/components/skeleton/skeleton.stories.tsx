import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A shimmering placeholder that occupies the shape of content while it loads, reducing layout shift and signalling that data is on the way.

### When to use
- While fetching content whose layout you can predict (cards, lists, avatars, lines of text).

For indeterminate work without a known shape (e.g. a button submitting) use a [Progress](/docs/feedback-progress--docs) spinner instead.

### Usage
\`\`\`tsx
import { Skeleton } from "@fv/ui";

// Size it with width/height utilities
<Skeleton variant="circle" className="size-12" />
<Skeleton variant="text" className="w-3/5" />
<Skeleton variant="block" className="h-40 w-full" />
\`\`\`

### Accessibility
Marked \`aria-hidden\` so the shimmer is skipped by assistive tech. Announce loading state on the surrounding region instead (e.g. \`aria-busy\` on the container, or a visually-hidden "Loading…").

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — the shimmer gradient is built from the \`--surface-2\` and \`--border\` tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["block", "text", "circle"],
      description: "Placeholder shape: a rounded block, a short text line, or a circle.",
      table: {
        type: { summary: '"block" | "text" | "circle"' },
        defaultValue: { summary: "block" },
      },
    },
    className: {
      control: false,
      description: "Use width/height utilities here to size the placeholder.",
      table: { type: { summary: "string" } },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Compose `circle` and `text` variants, sized with utility classes, to mirror the real layout.",
      },
    },
  },
  render: () => (
    <div className="flex w-80 items-center gap-3.5 rounded-md border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] bg-surface p-4 shadow-1">
      <Skeleton variant="circle" className="size-12 flex-none" />
      <div className="flex-1">
        <Skeleton variant="text" className="mb-2 w-3/5" />
        <Skeleton variant="text" className="w-4/5" />
      </div>
    </div>
  ),
};
