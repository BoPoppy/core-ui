import type { Meta, StoryObj } from "@storybook/react-vite";
import { SpeedDial } from "./speed-dial";

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: "Navigation/SpeedDial",
  component: SpeedDial,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { actions: [] },
} satisfies Meta<typeof SpeedDial>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex h-56 items-end">
      <SpeedDial
        actions={[
          {
            label: "Edit",
            icon: icon("M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"),
            onClick: () => {},
          },
          {
            label: "Share",
            icon: icon("M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"),
            onClick: () => {},
          },
          { label: "Delete", icon: icon("M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"), onClick: () => {} },
        ]}
      />
    </div>
  ),
};
