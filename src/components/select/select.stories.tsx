import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";

const meta = {
  title: "Inputs/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { label: "Country" },
  render: (args) => (
    <Select {...args}>
      <option value="us">United States</option>
      <option value="vn">Vietnam</option>
      <option value="jp">Japan</option>
      <option value="de">Germany</option>
    </Select>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "Where should we ship?" } };
export const ErrorState: Story = { args: { error: "Please choose a country." } };
export const Disabled: Story = { args: { disabled: true } };
