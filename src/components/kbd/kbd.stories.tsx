import type { Meta, StoryObj } from "@storybook/react";
import { Kbd, KbdCombo } from "./kbd";

const meta = {
  title: "Data display/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = { args: { children: "Esc" } };
export const Combo: Story = {
  render: () => (
    <KbdCombo>
      <Kbd>⌘</Kbd>
      <span>+</span>
      <Kbd>K</Kbd>
    </KbdCombo>
  ),
};
