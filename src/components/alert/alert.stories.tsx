import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./alert";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
An inline message that draws attention to a contextual status — informational, success, warning, or error — sitting alongside the content it relates to.

### When to use
- Surface a status or result inline, next to the form or section it concerns.
- Communicate validation outcomes, save confirmations, or warnings without interrupting flow.

For a page-level message bar spanning the top of a view, use Banner. For transient, auto-dismissing notifications, use Toast.

### Usage
\`\`\`tsx
import { Alert } from "@fv/ui";

<Alert variant="success" title="Saved">Your changes have been saved.</Alert>

// Dismissible — renders a ✕ button that calls onClose
<Alert variant="warn" title="Careful" onClose={dismiss}>Check your input.</Alert>

// Hide the default glyph
<Alert variant="info" icon={null}>No icon here.</Alert>
\`\`\`

### Accessibility
The root has \`role="alert"\`, so screen readers announce its content when it appears. The decorative glyph is \`aria-hidden\`; the dismiss button carries \`aria-label="Dismiss"\`. Pass \`icon={null}\` to drop the icon, or a custom node to replace it.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — each variant's background and text color derive from theme tokens, and Pop adds a solid border.
`.trim(),
      },
    },
  },
  args: { title: "Heads up", children: "Your changes have been saved.", variant: "info" },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warn", "danger"],
      description: "Status/intent of the message, driving color and default icon.",
      table: {
        type: { summary: '"info" | "success" | "warn" | "danger"' },
        defaultValue: { summary: "info" },
      },
    },
    title: { control: "text", description: "Bold heading rendered above the body." },
    children: { control: "text", description: "Body content of the alert." },
    icon: {
      control: false,
      description: "Custom icon node. Defaults to a per-variant glyph; pass `null` to hide.",
    },
    onClose: {
      control: false,
      description: "When provided, renders a dismiss button and is called on click.",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Success: Story = {
  args: { variant: "success", title: "Saved", children: "All set." },
};
export const Warn: Story = {
  args: { variant: "warn", title: "Careful", children: "Check your input." },
};
export const Danger: Story = {
  args: { variant: "danger", title: "Error", children: "Something failed." },
};
export const Dismissible: Story = {
  args: { onClose: () => {} },
  parameters: {
    docs: {
      description: {
        story: "Passing `onClose` adds a labelled dismiss button to the trailing edge.",
      },
    },
  },
};

export const All: Story = {
  render: () => (
    <div className="flex w-[420px] flex-col gap-3">
      <Alert variant="info" title="Info">
        An informational message.
      </Alert>
      <Alert variant="success" title="Success">
        Operation completed.
      </Alert>
      <Alert variant="warn" title="Warning">
        This may need attention.
      </Alert>
      <Alert variant="danger" title="Danger" onClose={() => {}}>
        Something went wrong.
      </Alert>
    </div>
  ),
};
