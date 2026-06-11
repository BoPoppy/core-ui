import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./input";

const meta = {
  title: "Inputs/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { label: "Email", placeholder: "you@example.com" },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "We'll never share it." } };
export const ErrorState: Story = {
  args: { error: "That email is already taken.", defaultValue: "x@y" },
};
export const SuccessState: Story = {
  args: { success: "Looks good!", defaultValue: "me@fv.dev" },
};
export const Disabled: Story = { args: { disabled: true, defaultValue: "locked@fv.dev" } };

export const States: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <TextField label="Default" placeholder="Type here" />
      <TextField label="With hint" hint="Helper text" placeholder="Type here" />
      <TextField label="Error" error="Required field" />
      <TextField label="Success" success="Verified" defaultValue="ok@fv.dev" />
    </div>
  ),
};
