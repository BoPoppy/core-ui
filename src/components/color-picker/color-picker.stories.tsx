import type { Meta, StoryObj } from "@storybook/react";
import { ColorPicker } from "./color-picker";

const meta = {
  title: "Advanced/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof ColorPicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Preset: Story = { args: { defaultValue: "#22c55e" } };
