import type { Meta, StoryObj } from "@storybook/react-vite";
import { Timeline } from "./timeline";

const meta = {
  title: "Data display/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Timeline>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        time: "09:00",
        title: "Order placed",
        description: "Your order was received.",
        status: "done",
      },
      { time: "11:30", title: "Packed", description: "Items packed and labelled.", status: "done" },
      {
        time: "14:00",
        title: "Out for delivery",
        description: "On the way to you.",
        status: "active",
      },
      { time: "—", title: "Delivered", status: "upcoming" },
    ],
  },
};
