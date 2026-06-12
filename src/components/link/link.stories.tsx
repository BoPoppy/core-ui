import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "./link";

const meta = {
  title: "Navigation/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { href: "#", children: "View documentation" },
} satisfies Meta<typeof Link>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Underline: Story = { args: { variant: "underline" } };
export const Muted: Story = { args: { variant: "muted" } };
