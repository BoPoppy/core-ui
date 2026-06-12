import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { BottomNav } from "./bottom-nav";

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: "Navigation/BottomNav",
  component: BottomNav,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { items: [], value: "", onValueChange: () => {} },
} satisfies Meta<typeof BottomNav>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("home");
    return (
      <BottomNav
        className="w-[360px]"
        value={value}
        onValueChange={setValue}
        items={[
          { value: "home", label: "Home", icon: icon("M3 11l9-8 9 8M5 10v10h14V10") },
          {
            value: "search",
            label: "Search",
            icon: icon("M21 21l-4.3-4.3M11 18a7 7 0 100-14 7 7 0 000 14z"),
          },
          {
            value: "profile",
            label: "Profile",
            icon: icon("M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0"),
          },
        ]}
      />
    );
  },
};
