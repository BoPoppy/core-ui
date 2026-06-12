import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { TextField } from "../input/input";
import { Popover, PopoverBody, PopoverContent, PopoverTitle, PopoverTrigger } from "./popover";

const meta = {
  title: "Data display/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A floating panel anchored to a trigger, holding rich interactive content — short forms, inline editors, settings, details — that opens on click and closes on outside click or Escape.

### When to use
- Inline editing or small forms that should not interrupt the page with a full dialog.
- Contextual detail or settings tied to a specific element.

For plain non-interactive hover hints use \`Tooltip\`; for a list of commands use \`Menu\`; for a modal blocking task use \`Dialog\`.

### Usage
\`\`\`tsx
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverTitle } from "@fv/ui";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Edit profile</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverBody>
      <PopoverTitle>Display name</PopoverTitle>
      <TextField aria-label="Display name" defaultValue="Tri Vo" />
    </PopoverBody>
  </PopoverContent>
</Popover>
\`\`\`

### Accessibility
Built on [Radix Popover](https://www.radix-ui.com/primitives/docs/components/popover), so it inherits focus trapping while open, return-focus to the trigger on close, Escape-to-close, outside-click dismissal and the \`aria-expanded\` / \`aria-controls\` wiring on the trigger. \`PopoverTitle\` renders an \`<h4>\` to label the panel's content. \`PopoverClose\` and \`PopoverAnchor\` are also exported for custom dismiss/positioning.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — panel surface, radius, shadow, border weight (Pop adds a hard \`fg\` border) and the open animation all come from tokens. The content also renders a matching arrow.
`.trim(),
      },
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "An inline edit form anchored to a button trigger, with a title, hint, and field.",
      },
    },
  },
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Edit profile</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <PopoverTitle>Display name</PopoverTitle>
          <p className="text-[13px] leading-relaxed text-muted">Shown across your workspace.</p>
          <TextField defaultValue="Tri Vo" aria-label="Display name" />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ),
};
