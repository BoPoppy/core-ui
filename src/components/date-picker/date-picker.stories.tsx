import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar, DatePicker } from "./date-picker";

const meta = {
  title: "Advanced/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof DatePicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const InlineCalendar: Story = {
  render: () => (
    <div className="rounded-md bg-surface border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] shadow-1">
      <Calendar />
    </div>
  ),
};
