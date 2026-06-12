import type { Meta, StoryObj } from "@storybook/react-vite";
import { TreeView } from "./tree-view";

const meta = {
  title: "Data display/TreeView",
  component: TreeView,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
An expandable/collapsible hierarchy for nested, parent–child data — file trees, category navigation, org charts. You pass a nested \`data\` array of nodes and it renders carets, indentation guides, and toggle behaviour.

### When to use
- Display data with clear parent/child nesting that the user can expand and collapse.
- Let users drill into a structure without losing the surrounding context.

For flat, non-nested lists use a List; for navigation between top-level destinations use a Menu or nav.

### Usage
\`\`\`tsx
import { TreeView } from "@fv/ui";

<TreeView
  defaultExpanded={["src"]}
  data={[
    {
      id: "src",
      label: "src",
      children: [
        { id: "button", label: "button.tsx" },
        { id: "card", label: "card.tsx" },
      ],
    },
    { id: "readme", label: "README.md" },
  ]}
/>
\`\`\`

Each node takes an \`id\`, a \`label\`, an optional \`icon\`, and optional \`children\`. \`defaultExpanded\` lists the node ids open on first render.

### Accessibility
Uses the WAI-ARIA tree pattern: the root is \`role="tree"\`, branches are \`role="group"\`, and each node is a \`role="treeitem"\` exposing \`aria-expanded\` when it has children. Items are keyboard-focusable and toggle on Enter/Space.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark — row hover, radius, the dashed indent guide, and caret/icon colors all come from CSS tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    data: {
      control: false,
      description:
        "Nested array of nodes; each node has `id`, `label`, optional `icon` and `children`.",
      table: { type: { summary: "TreeNode[]" } },
    },
    defaultExpanded: {
      control: false,
      description: "Node ids expanded on first render (uncontrolled).",
      table: { type: { summary: "string[]" }, defaultValue: { summary: "[]" } },
    },
  },
} satisfies Meta<typeof TreeView>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A file tree with `src` and `components` open on load via `defaultExpanded`. Click a branch or press Enter/Space to toggle it.",
      },
    },
  },
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
