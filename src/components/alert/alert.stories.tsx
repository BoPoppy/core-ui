import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./alert";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: { title: "Heads up", children: "Your changes have been saved.", variant: "info" },
  argTypes: { variant: { control: "select", options: ["info", "success", "warn", "danger"] } },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Success: Story = {
  args: { variant: "success", title: "Saved", children: "All set." },
};
export const Warn: Story = {
  args: { variant: "warn", title: "Careful", children: "Check your input." },
};
export const Danger: Story = {
  args: { variant: "danger", title: "Error", children: "Something failed." },
};
export const Dismissible: Story = { args: { onClose: () => {} } };

export const All: Story = {
  render: () => (
    <div className="flex w-[420px] flex-col gap-3">
      <Alert variant="info" title="Info">
        An informational message.
      </Alert>
      <Alert variant="success" title="Success">
        Operation completed.
      </Alert>
      <Alert variant="warn" title="Warning">
        This may need attention.
      </Alert>
      <Alert variant="danger" title="Danger" onClose={() => {}}>
        Something went wrong.
      </Alert>
    </div>
  ),
};
