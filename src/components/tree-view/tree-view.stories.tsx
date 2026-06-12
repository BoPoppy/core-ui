import type { Meta, StoryObj } from "@storybook/react-vite";
import { TreeView } from "./tree-view";

const meta = {
  title: "Data display/TreeView",
  component: TreeView,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof TreeView>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultExpanded: ["src", "components"],
    data: [
      {
        id: "src",
        label: "src",
        children: [
          {
            id: "components",
            label: "components",
            children: [
              { id: "button", label: "button.tsx" },
              { id: "card", label: "card.tsx" },
            ],
          },
          { id: "index", label: "index.ts" },
        ],
      },
      { id: "readme", label: "README.md" },
    ],
  },
};
