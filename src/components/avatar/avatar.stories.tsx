import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup } from "./avatar";

const meta = {
  title: "Data display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = { args: { fallback: "TV" } };
export const Accent: Story = { args: { fallback: "AC", variant: "accent" } };
export const WithStatus: Story = { args: { fallback: "ON", status: "online" } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar size="xs" fallback="XS" />
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar fallback="AB" />
      <Avatar fallback="CD" variant="accent" />
      <Avatar fallback="EF" />
      <Avatar fallback="+5" className="bg-accent-soft text-fg" />
    </AvatarGroup>
  ),
};
