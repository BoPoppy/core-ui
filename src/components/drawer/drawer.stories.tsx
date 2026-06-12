import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "./drawer";

const meta = {
  title: "Navigation/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A panel that slides in from an edge of the screen — for navigation, filters, or secondary detail that shouldn't take over the whole view. Built on Radix Dialog and composed from \`DrawerTrigger\`, \`DrawerContent\`, \`DrawerTitle\`, \`DrawerDescription\` and \`DrawerClose\`. \`DrawerContent\` takes a \`side\` of \`"left" | "right" | "top" | "bottom"\`.

### When to use
- App or section navigation that should overlay rather than reflow the page.
- Filter panels, detail inspectors, or carts anchored to a screen edge.

For a centered confirmation or short task, use a Dialog instead.

### Usage
\`\`\`tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerClose, Button } from "@fv/ui";

<Drawer>
  <DrawerTrigger asChild><Button variant="secondary">Menu</Button></DrawerTrigger>
  <DrawerContent side="left">
    <DrawerTitle>Navigation</DrawerTitle>
    {/* links… */}
    <DrawerClose asChild><Button variant="ghost">Close</Button></DrawerClose>
  </DrawerContent>
</Drawer>
\`\`\`

### Accessibility
- Inherits Radix Dialog a11y: focus is trapped while open and restored to the trigger on close, Esc and scrim-click dismiss, and background content is inert.
- \`DrawerContent\` is \`role="dialog"\` / \`aria-modal\`; include a \`DrawerTitle\` (and optionally \`DrawerDescription\`) so it is properly labelled.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — surface, border weight, shadow and the directional slide-in animation all follow the active theme.
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
      description: "Called when the drawer requests to open or close (Radix).",
      table: { type: { summary: "(open: boolean) => void" } },
    },
    modal: {
      control: false,
      description:
        "When true (default) interaction outside the drawer is blocked and focus is trapped (Radix).",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },
  },
} satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {
  parameters: {
    docs: {
      description: {
        story: '`DrawerContent side="left"` slides a navigation panel in from the left edge.',
      },
    },
  },
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="left">
        <div className="flex flex-col gap-3 p-5">
          <DrawerTitle className="text-base [font-weight:var(--font-weight-strong)]">
            Navigation
          </DrawerTitle>
          <nav className="flex flex-col gap-1 text-sm text-muted">
            <span className="cursor-pointer rounded-sm px-2 py-2 hover:bg-accent-soft">Home</span>
            <span className="cursor-pointer rounded-sm px-2 py-2 hover:bg-accent-soft">
              Projects
            </span>
            <span className="cursor-pointer rounded-sm px-2 py-2 hover:bg-accent-soft">
              Settings
            </span>
          </nav>
          <DrawerClose asChild>
            <Button variant="ghost" size="sm" className="mt-auto">
              Close
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};
