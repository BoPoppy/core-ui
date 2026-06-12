import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimePicker } from "./time-picker";

const meta = {
  title: "Advanced/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof TimePicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: { hour: 9, minute: 30, period: "AM" } } };
export const FiveMinuteStep: Story = {
  args: { minuteStep: 5, defaultValue: { hour: 2, minute: 15, period: "PM" } },
};
