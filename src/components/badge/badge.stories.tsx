import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta = {
  title: "Data display/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Badge", variant: "neutral" },
  argTypes: {
    variant: { control: "select", options: ["neutral", "accent", "success", "danger"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Accent: Story = { args: { variant: "accent" } };
export const WithDot: Story = { args: { variant: "success", dot: true, children: "Online" } };

export const All: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Neutral</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success" dot>
        Active
      </Badge>
      <Badge variant="danger" dot>
        Error
      </Badge>
    </div>
  ),
};
