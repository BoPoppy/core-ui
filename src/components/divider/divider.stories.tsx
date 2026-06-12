import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./divider";

const meta = {
  title: "Data display/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A presentational separator line that visually groups content. Horizontal by default; pass children for a centered label, or \`orientation="vertical"\` to separate items inside a flex row.

### When to use
- Splitting sections of a list, form, or menu.
- Adding an "OR" / "and" label between two blocks (label is horizontal only).
- A thin vertical rule between inline items such as toolbar actions.

### Usage
\`\`\`tsx
import { Divider } from "@fv/ui";

<Divider />
<Divider variant="dashed" />

// Labelled (centered text with rules on each side)
<Divider>OR</Divider>

// Vertical, inside a flex row
<div className="flex items-center gap-3">
  <span>Edit</span>
  <Divider orientation="vertical" />
  <span>Share</span>
</div>
\`\`\`

### Accessibility
- A plain (unlabelled) divider is \`aria-hidden\` — it carries no semantics and is skipped by assistive tech, which is correct for a purely decorative rule.
- A labelled divider renders its text content so the label is read normally. It spreads through any \`div\` attributes (e.g. \`role="separator"\`) if you need explicit separator semantics.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — line color and the dashed border draw from theme borders.
`.trim(),
      },
    },
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      description: "Direction of the rule. Use `vertical` inside a flex row.",
      table: {
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: "horizontal" },
      },
    },
    variant: {
      control: "inline-radio",
      options: ["solid", "dashed"],
      description: "Line style (horizontal, unlabelled only).",
      table: { type: { summary: '"solid" | "dashed"' }, defaultValue: { summary: "solid" } },
    },
    children: {
      control: "text",
      description: "Optional centered label; renders rules on each side (horizontal only).",
      table: { type: { summary: "ReactNode" } },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = { render: () => <Divider className="w-72" /> };
export const Dashed: Story = { render: () => <Divider variant="dashed" className="w-72" /> };
export const Labelled: Story = {
  parameters: {
    docs: {
      description: { story: "Children render as a centered label with a rule on each side." },
    },
  },
  render: () => (
    <div className="w-72">
      <Divider>OR</Divider>
    </div>
  ),
};
export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: '`orientation="vertical"` stretches to the row height to separate inline items.',
      },
    },
  },
  render: () => (
    <div className="flex h-8 items-center gap-3 text-sm text-muted">
      <span>Edit</span>
      <Divider orientation="vertical" />
      <span>Share</span>
      <Divider orientation="vertical" />
      <span>Delete</span>
    </div>
  ),
};
