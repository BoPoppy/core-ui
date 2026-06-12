import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateRangePicker, RangeCalendar } from "./date-range";

const meta = {
  title: "Advanced/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof DateRangePicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const InlineCalendar: Story = {
  render: () => (
    <div className="rounded-md bg-surface border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] shadow-1">
      <RangeCalendar />
    </div>
  ),
};
