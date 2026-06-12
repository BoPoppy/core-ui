import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircularProgress, Progress, Spinner } from "./progress";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linear: Story = { args: { value: 65 } };
export const Indeterminate: Story = { args: {} };

export const Circular: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <CircularProgress value={65} showLabel />
      <CircularProgress value={30} />
      <Spinner />
    </div>
  ),
};
