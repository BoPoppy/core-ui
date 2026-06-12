import type { Meta, StoryObj } from "@storybook/react-vite";
import { Autocomplete } from "./autocomplete";

const meta = {
  title: "Inputs/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    options: ["Apple", "Banana", "Blueberry", "Cherry", "Grape", "Mango", "Orange", "Peach"],
  },
} satisfies Meta<typeof Autocomplete>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { className: "w-72" } };
