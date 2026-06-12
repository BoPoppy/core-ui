import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { ToastProvider, useToast } from "./toast";

const Demo = () => {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast({ title: "Saved", description: "Your changes are live." })}>
        Default
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({ variant: "success", title: "Uploaded", description: "3 files added." })
        }
      >
        Success
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast({
            variant: "danger",
            title: "Failed",
            description: "Could not connect.",
            action: { label: "Retry", onClick: () => {} },
          })
        }
      >
        With action
      </Button>
    </div>
  );
};

const meta = {
  title: "Feedback/Toast",
  component: ToastProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A brief, auto-dismissing notification that confirms an action or reports an outcome without interrupting the user. Wrap your app once in \`ToastProvider\`, then fire toasts imperatively from anywhere via \`useToast()\`.

### When to use
- Confirm a background action succeeded ("Saved", "3 files uploaded").
- Surface a transient error with an optional retry action.

For information that must be acknowledged or blocks the flow, use a Dialog instead; for persistent, inline status messages use Banner or Alert.

### Usage
\`\`\`tsx
import { ToastProvider, useToast } from "@fv/ui";

// Mount once, near the app root
<ToastProvider>
  <App />
</ToastProvider>

// Anywhere below the provider
const { toast } = useToast();
toast({ title: "Saved", description: "Your changes are live." });

// With a variant and an action button
toast({
  variant: "danger",
  title: "Failed",
  description: "Could not connect.",
  action: { label: "Retry", onClick: retry },
});
\`\`\`

### Accessibility
Built on [Radix Toast](https://www.radix-ui.com/primitives/docs/components/toast), so it inherits the ARIA live-region announcements, focus management, swipe-to-dismiss, and timer pausing on hover/focus. Each toast has a labelled Close button; action buttons carry an \`altText\` for screen readers.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark — surface, radius, border weight, shadow, and the slide-in animation all come from CSS tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    duration: {
      control: "number",
      description: "Default auto-dismiss duration in ms; per-toast `duration` overrides it.",
      table: { type: { summary: "number" }, defaultValue: { summary: "4000" } },
    },
    children: { control: false, description: "The app subtree that can fire toasts." },
  },
  args: { children: null },
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Click a button to fire a toast via `useToast()`. Each variant maps to a different status dot color, and the danger toast carries a retry action.",
      },
    },
  },
};
