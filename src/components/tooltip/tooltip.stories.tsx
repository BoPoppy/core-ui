import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Tooltip } from "./tooltip";

const meta = {
  title: "Data display/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { content: "Tooltip", children: <Button variant="secondary">Hover me</Button> },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { content: "Add to library", children: <Button variant="secondary">Hover me</Button> },
};

export const Sides: Story = {
  render: () => (
    <div className="flex gap-4">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} content={`On ${side}`} side={side} defaultOpen>
          <Button variant="secondary" size="sm">
            {side}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};
