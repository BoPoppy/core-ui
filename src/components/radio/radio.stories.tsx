import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, RadioGroup } from "./radio";

const meta = {
  title: "Inputs/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="standard">
      <Radio value="standard" label="Standard shipping" />
      <Radio value="express" label="Express shipping" />
      <Radio value="overnight" label="Overnight" />
      <Radio value="pickup" label="In-store pickup" disabled />
    </RadioGroup>
  ),
};
