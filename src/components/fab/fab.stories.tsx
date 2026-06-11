import type { Meta, StoryObj } from "@storybook/react";
import { Fab } from "./fab";

const Plus = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const meta = {
  title: "Inputs/FAB",
  component: Fab,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Fab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: <Plus />, "aria-label": "Add" } };
export const Small: Story = { args: { size: "sm", children: <Plus />, "aria-label": "Add" } };
export const Extended: Story = {
  args: {
    extended: true,
    children: (
      <>
        <Plus />
        Create
      </>
    ),
  },
};
