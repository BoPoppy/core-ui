import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Tooltip } from "./tooltip";

const meta = {
  title: "Data display/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A small "ink" bubble that reveals a short label or hint when a user hovers or focuses an element. It is self-contained (bundles its own provider) so it works on a single trigger out of the box.

### When to use
- Name an icon-only control, or clarify a terse label, on hover/focus.
- Surface a brief, non-essential hint.

Keep the content to a few words — never put essential information, interactive elements, or long text in a tooltip. For richer, click-triggered content use a Popover. For many tooltips across a screen, wrap the app in \`TooltipProvider\` and share its timing.

### Usage
\`\`\`tsx
import { Tooltip } from "@fv/ui";

<Tooltip content="Add to library">
  <Button variant="secondary">Hover me</Button>
</Tooltip>

// Position it relative to the trigger
<Tooltip content="Settings" side="right">
  <IconButton aria-label="Settings"><GearIcon /></IconButton>
</Tooltip>
\`\`\`

### Accessibility
Built on [Radix Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip), so it inherits hover- and keyboard-focus triggering, Escape to dismiss, and correct \`aria-describedby\` wiring. The trigger is rendered via \`asChild\`, so the child must be a focusable element. Because tooltips are not reachable on touch and don't replace a label, still give icon-only triggers their own \`aria-label\`.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark — the bubble uses the foreground/background tokens (inverting in dark) plus token-driven radius, shadow, and fade-in.
`.trim(),
      },
    },
  },
  argTypes: {
    content: {
      control: "text",
      description: "The tooltip text or node shown in the bubble.",
      table: { type: { summary: "ReactNode" } },
    },
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
      description: "Preferred edge of the trigger to render on (flips if it would overflow).",
      table: {
        type: { summary: '"top" | "right" | "bottom" | "left"' },
        defaultValue: { summary: "top" },
      },
    },
    align: {
      control: "inline-radio",
      options: ["start", "center", "end"],
      description: "Alignment against the trigger along the chosen side.",
      table: {
        type: { summary: '"start" | "center" | "end"' },
        defaultValue: { summary: "center" },
      },
    },
    sideOffset: {
      control: "number",
      description: "Gap in px between the trigger and the bubble.",
      table: { type: { summary: "number" }, defaultValue: { summary: "8" } },
    },
    delayDuration: {
      control: "number",
      description: "Delay in ms before the tooltip opens on hover.",
      table: { type: { summary: "number" }, defaultValue: { summary: "200" } },
    },
    defaultOpen: {
      control: "boolean",
      description: "Render the tooltip open on mount (uncontrolled).",
      table: { type: { summary: "boolean" } },
    },
    children: {
      control: false,
      description: "The focusable trigger element (rendered via `asChild`).",
    },
  },
  args: { content: "Tooltip", children: <Button variant="secondary">Hover me</Button> },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { content: "Add to library", children: <Button variant="secondary">Hover me</Button> },
};

export const Sides: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The `side` prop positions the bubble; each here uses `defaultOpen` to show all four at once.",
      },
    },
  },
  render: () => (
    <div className="flex gap-4">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} content={`On ${side}`} side={side} defaultOpen>
          <Button variant="secondary" size="sm">
            {side}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};
