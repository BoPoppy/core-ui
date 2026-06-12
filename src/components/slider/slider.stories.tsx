import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./slider";

const meta = {
  title: "Inputs/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: [50], max: 100, step: 1 } };
export const Stepped: Story = { args: { defaultValue: [40], max: 100, step: 20 } };
export const Range: Story = { args: { defaultValue: [25, 75], max: 100, step: 1 } };
export const Disabled: Story = { args: { defaultValue: [30], disabled: true } };
