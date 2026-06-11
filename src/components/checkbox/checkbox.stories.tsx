import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";

const meta = {
  title: "Inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: "Accept terms" } };
export const Checked: Story = { args: { label: "Subscribed", defaultChecked: true } };
export const Disabled: Story = { args: { label: "Unavailable", disabled: true } };
export const NoLabel: Story = { args: { "aria-label": "Select row" } };

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-2.5">
      <Checkbox label="Email notifications" defaultChecked />
      <Checkbox label="SMS notifications" />
      <Checkbox label="Push notifications" defaultChecked />
    </div>
  ),
};
