import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "./rating";

const meta = {
  title: "Inputs/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: 3 } };
export const ReadOnly: Story = { args: { value: 4, readOnly: true } };
export const TenStars: Story = { args: { defaultValue: 7, max: 10 } };
