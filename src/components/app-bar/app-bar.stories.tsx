import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../avatar/avatar";
import { AppBar, AppBarIcon, AppBarSpacer, AppBarTitle } from "./app-bar";

const meta = { title: "Surfaces/AppBar", component: AppBar, tags: ["autodocs"] } satisfies Meta<
  typeof AppBar
>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppBar className="w-[560px]">
      <AppBarIcon aria-label="Open menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
        </svg>
      </AppBarIcon>
      <AppBarTitle>Dashboard</AppBarTitle>
      <AppBarSpacer />
      <Avatar size="sm" fallback="TV" className="border-white/30" />
    </AppBar>
  ),
};
