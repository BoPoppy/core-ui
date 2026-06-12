import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stepper } from "./stepper";

const meta = { title: "Navigation/Stepper", component: Stepper, tags: ["autodocs"] } satisfies Meta<
  typeof Stepper
>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    current: 1,
    steps: [{ label: "Cart" }, { label: "Shipping" }, { label: "Payment" }, { label: "Done" }],
  },
};
