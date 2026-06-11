import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./carousel";

const meta = {
  title: "Surfaces/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Carousel>;
export default meta;
type Story = StoryObj<typeof meta>;

const Slide = ({ n }: { n: number }) => (
  <div className="grid h-48 place-items-center bg-accent-soft text-2xl font-bold text-fg">
    Slide {n}
  </div>
);

export const Default: Story = {
  render: () => (
    <Carousel className="w-[480px]">
      <Slide n={1} />
      <Slide n={2} />
      <Slide n={3} />
    </Carousel>
  ),
};
