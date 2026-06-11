import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  render: () => (
    <div className="flex w-80 items-center gap-3.5 rounded-md border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] bg-surface p-4 shadow-1">
      <Skeleton variant="circle" className="size-12 flex-none" />
      <div className="flex-1">
        <Skeleton variant="text" className="mb-2 w-3/5" />
        <Skeleton variant="text" className="w-4/5" />
      </div>
    </div>
  ),
};
