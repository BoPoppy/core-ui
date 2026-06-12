import type { Meta, StoryObj } from "@storybook/react";
import { NumberField } from "./number-field";

const meta = {
  title: "Inputs/NumberField",
  component: NumberField,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { "aria-label": "Quantity" },
} satisfies Meta<typeof NumberField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: 1 } };
export const Clamped: Story = { args: { defaultValue: 5, min: 0, max: 10, step: 1 } };
export const Stepped: Story = { args: { defaultValue: 0, step: 25, min: 0, max: 100 } };
