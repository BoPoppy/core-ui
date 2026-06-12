import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { EmptyState } from "./empty-state";

const InboxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M22 12h-6l-2 3h-4l-2-3H2" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M5.5 5.5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.5A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.5z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A centered placeholder for the "nothing here yet" moments — empty lists, no search results, a freshly created project. Combines an optional icon, title, description and a call-to-action.

### When to use
- A list, table or search returns no rows and you want to guide the user forward.
- A first-run / onboarding state where the user hasn't created anything yet.

Reach for a [Skeleton](/docs/feedback-skeleton--docs) while data is still loading, and a [Banner](/docs/feedback-banner--docs) or [Alert](/docs/feedback-alert--docs) for errors rather than an empty state.

### Usage
\`\`\`tsx
import { EmptyState, Button } from "@fv/ui";

<EmptyState
  icon={<InboxIcon />}
  title="No messages yet"
  description="When you receive messages, they'll show up here."
  action={<Button>Compose</Button>}
/>
\`\`\`

### Accessibility
Renders a plain \`<div>\` with a centered \`<h3>\` title and \`<p>\` description, so the heading is announced in the document outline. The icon wrapper is decorative; keep meaning in the \`title\`/\`description\` and ensure any \`action\` is itself an accessible control.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — the icon badge picks up surface, border and accent colors automatically.
`.trim(),
      },
    },
  },
  argTypes: {
    icon: {
      control: false,
      description: "Decorative icon shown in a tinted round badge above the title.",
      table: { type: { summary: "React.ReactNode" } },
    },
    title: {
      control: "text",
      description: "Primary heading, rendered as an `<h3>`.",
      table: { type: { summary: "React.ReactNode" } },
    },
    description: {
      control: "text",
      description: "Supporting text below the title.",
      table: { type: { summary: "React.ReactNode" } },
    },
    action: {
      control: false,
      description: "Trailing call-to-action, typically a `Button`.",
      table: { type: { summary: "React.ReactNode" } },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <InboxIcon />,
    title: "No messages yet",
    description: "When you receive messages, they'll show up here.",
    action: <Button>Compose</Button>,
  },
};
