import type { Meta, StoryObj } from "@storybook/react-vite";
import { OTPInput } from "./otp-input";

const meta = {
  title: "Inputs/OTPInput",
  component: OTPInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof OTPInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FourDigits: Story = { args: { length: 4 } };
export const Prefilled: Story = { args: { defaultValue: "1234" } };
