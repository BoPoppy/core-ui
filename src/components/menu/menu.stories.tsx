import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Menu, MenuContent, MenuItem, MenuLabel, MenuSeparator, MenuTrigger } from "./menu";

const meta = {
  title: "Navigation/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
