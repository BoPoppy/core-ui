import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Banner } from "./banner";

const meta = {
  title: "Feedback/Banner",
  component: Banner,
  tags: ["autodocs"],
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  render: () => (
    <Banner
      className="w-[560px]"
      action={
        <Button size="sm" variant="secondary">
          Upgrade
        </Button>
      }
      onClose={() => {}}
    >
      You're on the free plan.
    </Banner>
  ),
};

export const Subtle: Story = {
  render: () => (
    <Banner
      className="w-[560px]"
      variant="subtle"
      description="Restart to apply the update."
      onClose={() => {}}
    >
      A new version is available.
    </Banner>
  ),
};
