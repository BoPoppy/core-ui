import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";

const meta = {
  title: "Inputs/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: "Airplane mode" } };
export const On: Story = { args: { label: "Wi-Fi", defaultChecked: true } };
export const Disabled: Story = { args: { label: "Locked", disabled: true } };
export const NoLabel: Story = { args: { "aria-label": "Toggle" } };
