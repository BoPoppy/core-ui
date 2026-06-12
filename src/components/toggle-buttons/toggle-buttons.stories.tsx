import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleButtons, ToggleButtonsItem } from "./toggle-buttons";

const meta = {
  title: "Inputs/ToggleButtons",
  component: ToggleButtons,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { type: "single" },
} satisfies Meta<typeof ToggleButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => (
    <ToggleButtons type="single" defaultValue="grid">
      <ToggleButtonsItem value="list">List</ToggleButtonsItem>
      <ToggleButtonsItem value="grid">Grid</ToggleButtonsItem>
      <ToggleButtonsItem value="board">Board</ToggleButtonsItem>
    </ToggleButtons>
  ),
};
