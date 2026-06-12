import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonGroup, ButtonGroupItem } from "./button-group";

const meta = {
  title: "Inputs/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { type: "single" },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => (
    <ButtonGroup type="single" defaultValue="week">
      <ButtonGroupItem value="day">Day</ButtonGroupItem>
      <ButtonGroupItem value="week">Week</ButtonGroupItem>
      <ButtonGroupItem value="month">Month</ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ButtonGroup type="multiple" defaultValue={["bold"]}>
      <ButtonGroupItem value="bold">B</ButtonGroupItem>
      <ButtonGroupItem value="italic">I</ButtonGroupItem>
      <ButtonGroupItem value="underline">U</ButtonGroupItem>
    </ButtonGroup>
  ),
};
