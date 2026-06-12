import type { Meta, StoryObj } from "@storybook/react";
import { TagInput } from "./tag-input";

const meta = {
  title: "Inputs/TagInput",
  component: TagInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof TagInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: ["react", "typescript"], className: "w-80" },
};
export const Empty: Story = { args: { placeholder: "Add skills…", className: "w-80" } };
