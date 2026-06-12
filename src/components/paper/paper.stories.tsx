import type { Meta, StoryObj } from "@storybook/react-vite";
import { Paper } from "./paper";

const meta = {
  title: "Surfaces/Paper",
  component: Paper,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Paper>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Elevations: Story = {
  render: () => (
    <div className="flex gap-5">
      {([0, 1, 2, 3] as const).map((e) => (
        <Paper key={e} elevation={e} className="grid size-24 place-items-center text-sm text-muted">
          {e}
        </Paper>
      ))}
    </div>
  ),
};
