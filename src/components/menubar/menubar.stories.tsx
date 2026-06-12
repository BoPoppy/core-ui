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
  parameters: { layout: "centered" },
} satisfies Meta<typeof Menubar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
