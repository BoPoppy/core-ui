import type { Meta, StoryObj } from "@storybook/react-vite";
import { Timeline } from "./timeline";

const meta = {
  title: "Data display/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A vertical activity feed: an ordered list of events connected by a line, each with a status node, optional time, title, and description.

### When to use
- Showing chronological progress or history — order tracking, audit trails, onboarding steps.
- When the relative order of events and their completed/active/upcoming state matter.

For a numbered, interactive process the user advances through, use a Stepper instead.

### Usage
\`\`\`tsx
import { Timeline } from "@fv/ui";

<Timeline
  items={[
    { time: "09:00", title: "Order placed", description: "Received.", status: "done" },
    { time: "14:00", title: "Out for delivery", status: "active" },
    { title: "Delivered", status: "upcoming" },
  ]}
/>
\`\`\`

### Accessibility
- Renders a native ordered list (\`<ol>\`/\`<li>\`), conveying sequence to assistive tech; status is shown via the node's colour and ring.
- The connecting line and status dots are presentational; ensure each item's \`title\` carries the meaning rather than relying on colour alone.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — node fill, the accent ring on the active step, and the connecting line.
`.trim(),
      },
    },
  },
  argTypes: {
    items: {
      control: false,
      description:
        'Ordered events to render. Each has `title`, optional `description` and `time`, and a `status` of `"done" | "active" | "upcoming"`.',
      table: { type: { summary: "TimelineItem[]" } },
    },
  },
} satisfies Meta<typeof Timeline>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Mixed `done` / `active` / `upcoming` nodes; the active step gets the accent ring.",
      },
    },
  },
  args: {
    items: [
      {
        time: "09:00",
        title: "Order placed",
        description: "Your order was received.",
        status: "done",
      },
      { time: "11:30", title: "Packed", description: "Items packed and labelled.", status: "done" },
      {
        time: "14:00",
        title: "Out for delivery",
        description: "On the way to you.",
        status: "active",
      },
      { time: "—", title: "Delivered", status: "upcoming" },
    ],
  },
};
