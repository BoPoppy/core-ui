import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./menubar";

const meta = {
  title: "Navigation/Menubar",
  component: Menubar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A horizontal bar of always-visible top-level menus — the desktop-app pattern of **File / Edit / View** that opens dropdowns of grouped commands.

### When to use
- Desktop-style applications or editors that expose many commands under a few persistent headings.
- When the same set of menus should stay visible and switchable as the user moves between them.

For a single contextual menu opened from one trigger, use \`Menu\`. For ⌘K-style search across commands, use \`CommandPalette\`.

### Usage
\`\`\`tsx
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@fv/ui";

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem shortcut="⌘N">New</MenubarItem>
      <MenubarSeparator />
      <MenubarItem shortcut="⌘S">Save</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
\`\`\`

### Accessibility
Built on [Radix Menubar](https://www.radix-ui.com/primitives/docs/components/menubar), so it inherits roaming-tabindex roving focus, full arrow-key navigation between menus and items, type-ahead, Escape to close, and the correct \`menubar\` / \`menu\` / \`menuitem\` roles. The \`shortcut\` text on \`MenubarItem\` is visual only — it does not bind the key.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — surface, radius, border weight (Pop adds a hard \`fg\` border) and the highlight color all come from tokens.
`.trim(),
      },
    },
  },
} satisfies Meta<typeof Menubar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Three menus with command items, keyboard shortcuts, and a separator. Click or use arrow keys to move between menus.",
      },
    },
  },
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem shortcut="⌘N">New</MenubarItem>
          <MenubarItem shortcut="⌘O">Open</MenubarItem>
          <MenubarSeparator />
          <MenubarItem shortcut="⌘S">Save</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem shortcut="⌘Z">Undo</MenubarItem>
          <MenubarItem shortcut="⇧⌘Z">Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Zoom in</MenubarItem>
          <MenubarItem>Zoom out</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
