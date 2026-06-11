import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./divider";

const meta = {
  title: "Data display/Divider",
  component: Divider,
  tags: ["autodocs"],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = { render: () => <Divider className="w-72" /> };
export const Dashed: Story = { render: () => <Divider variant="dashed" className="w-72" /> };
export const Labelled: Story = {
  render: () => (
    <div className="w-72">
      <Divider>OR</Divider>
    </div>
  ),
};
export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3 text-sm text-muted">
      <span>Edit</span>
      <Divider orientation="vertical" />
      <span>Share</span>
      <Divider orientation="vertical" />
      <span>Delete</span>
    </div>
  ),
};
