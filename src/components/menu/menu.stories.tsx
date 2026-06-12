import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Menu, MenuContent, MenuItem, MenuLabel, MenuSeparator, MenuTrigger } from "./menu";

const meta = {
  title: "Navigation/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A dropdown menu built on [Radix DropdownMenu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu). Compose \`Menu\` (root) with \`MenuTrigger\`, \`MenuContent\`, and \`MenuItem\` — plus \`MenuLabel\`, \`MenuSeparator\` and \`MenuGroup\` for structure.

### When to use
- A list of actions revealed from a trigger button: row actions, account menus, "more" overflow menus.
- Items can carry a \`shortcut\` hint and a \`danger\` style for destructive actions.

For a single navigational set of top-level destinations, prefer [Tabs](/docs/navigation-tabs--docs) or a nav bar; for a searchable action list, see [CommandPalette](/docs/surfaces-commandpalette--docs).

### Usage
\`\`\`tsx
import { Menu, MenuTrigger, MenuContent, MenuItem, MenuLabel, MenuSeparator, Button } from "@fv/ui";

<Menu>
  <MenuTrigger asChild>
    <Button variant="secondary">Open menu</Button>
  </MenuTrigger>
  <MenuContent>
    <MenuLabel>Account</MenuLabel>
    <MenuItem shortcut="⌘P">Profile</MenuItem>
    <MenuSeparator />
    <MenuItem danger shortcut="⌘Q">Sign out</MenuItem>
  </MenuContent>
</Menu>
\`\`\`

### Accessibility
Inherits Radix DropdownMenu's accessibility: the content has \`role="menu"\` with \`menuitem\` children, full keyboard support (arrow keys to move, Enter/Space to activate, Esc to close, typeahead), focus trapping while open, and \`aria-expanded\`/\`aria-haspopup\` on the trigger. \`MenuItem\` exposes \`disabled\` (via \`data-disabled\`) and \`onSelect\`.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — surface, border weight, radius, the highlighted-item accent tint and the open animation all derive from tokens.
`.trim(),
      },
    },
  },
} satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A typical account menu: a label, items with `shortcut` hints, a separator, and a `danger` item for sign-out.",
      },
    },
  },
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="secondary">Open menu</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuLabel>Account</MenuLabel>
        <MenuItem shortcut="⌘P">Profile</MenuItem>
        <MenuItem shortcut="⌘,">Settings</MenuItem>
        <MenuSeparator />
        <MenuItem danger shortcut="⌘Q">
          Sign out
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};
