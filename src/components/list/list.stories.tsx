import type { Meta, StoryObj } from "@storybook/react";
import { List, ListItem } from "./list";

const Dot = () => <span className="size-2.5 rounded-full bg-accent" />;

const meta = {
  title: "Data display/List",
  component: List,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <List className="w-80">
      <ListItem icon={<Dot />} title="Inbox" subtitle="12 new messages" meta="2m" />
      <ListItem icon={<Dot />} title="Drafts" subtitle="3 saved" meta="1h" />
      <ListItem icon={<Dot />} title="Sent" subtitle="Last sent yesterday" meta="1d" />
    </List>
  ),
};
