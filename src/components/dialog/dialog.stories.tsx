import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const meta = {
  title: "Feedback/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A modal dialog for focused tasks and confirmations — it overlays the page with a scrim, traps focus, and must be dismissed before the user continues. Built on Radix Dialog and composed from \`DialogTrigger\`, \`DialogContent\`, \`DialogBody\`, \`DialogTitle\`, \`DialogDescription\`, \`DialogFooter\` and \`DialogClose\`.

### When to use
- Confirming a destructive or consequential action (delete, discard).
- A short, self-contained task that should block the rest of the UI until resolved.

For non-blocking, edge-anchored panels (navigation, filters) use a Drawer; for transient notifications use a Toast.

### Usage
\`\`\`tsx
import {
  Dialog, DialogTrigger, DialogContent, DialogBody,
  DialogTitle, DialogDescription, DialogFooter, DialogClose, Button,
} from "@fv/ui";

<Dialog>
  <DialogTrigger asChild><Button>Delete account</Button></DialogTrigger>
  <DialogContent>
    <DialogBody>
      <DialogTitle>Delete account?</DialogTitle>
      <DialogDescription>This cannot be undone.</DialogDescription>
    </DialogBody>
    <DialogFooter>
      <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
      <DialogClose asChild><Button variant="danger">Delete</Button></DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`

### Accessibility
- Inherits Radix Dialog a11y: focus is trapped inside while open and restored to the trigger on close, Esc and scrim-click dismiss, and background content is inert.
- \`DialogContent\` is \`role="dialog"\` with \`aria-modal\`; pair \`DialogTitle\` and \`DialogDescription\` so they wire up as \`aria-labelledby\` / \`aria-describedby\`.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — surface, radius, border weight, shadow and the entrance animation all follow the active theme.
`.trim(),
      },
    },
  },
  argTypes: {
    open: {
      control: false,
      description: "Controlled open state (Radix). Pair with `onOpenChange`.",
      table: { type: { summary: "boolean" } },
    },
    defaultOpen: {
      control: false,
      description: "Initial open state when uncontrolled (Radix).",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    onOpenChange: {
      control: false,
      description: "Called when the dialog requests to open or close (Radix).",
      table: { type: { summary: "(open: boolean) => void" } },
    },
    modal: {
      control: false,
      description:
        "When true (default) interaction is blocked outside the dialog and focus is trapped (Radix).",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },
  },
} satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A destructive confirmation: title, description, and a ghost Cancel beside a danger Delete.",
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Delete account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogBody>
          <DialogTitle>Delete account?</DialogTitle>
          <DialogDescription>
            This permanently removes your account and all data. This cannot be undone.
          </DialogDescription>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="danger">Delete</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
