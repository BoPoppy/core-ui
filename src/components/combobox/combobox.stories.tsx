import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox } from "./combobox";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "angular", label: "Angular" },
];

const meta = {
  title: "Inputs/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { options },
} satisfies Meta<typeof Combobox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: ["react"], className: "w-72" } };
export const Empty: Story = { args: { placeholder: "Pick frameworks…", className: "w-72" } };
