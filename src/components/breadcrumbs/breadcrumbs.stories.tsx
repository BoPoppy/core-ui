import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./breadcrumbs";

const meta = {
  title: "Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumbs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [{ label: "Home", href: "#" }, { label: "Projects", href: "#" }, { label: "Atlas" }],
  },
};
