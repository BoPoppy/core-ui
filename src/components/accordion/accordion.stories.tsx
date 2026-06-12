import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

const meta = {
  title: "Surfaces/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A vertically stacked set of headers that each reveal an associated panel of content — handy for FAQs, settings groups, and progressive disclosure in dense layouts. Built on Radix Accordion and composed from \`Accordion\`, \`AccordionItem\`, \`AccordionTrigger\`, and \`AccordionContent\`.

### When to use
- Condense long content into collapsible sections the user can scan and open on demand.
- FAQs, grouped form sections, or sidebar nav groups.

For switching between mutually exclusive views without hiding content, prefer Tabs. For a single show/hide region, a Collapsible is lighter weight.

### Usage
\`\`\`tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@fv/ui";

<Accordion type="single" collapsible defaultValue="a">
  <AccordionItem value="a">
    <AccordionTrigger>What is @fv/ui?</AccordionTrigger>
    <AccordionContent>A token-driven React component library.</AccordionContent>
  </AccordionItem>
</Accordion>

// Allow several panels open at once
<Accordion type="multiple">…</Accordion>
\`\`\`

### Accessibility
Inherits Radix Accordion's a11y: each trigger is a \`<button>\` inside a heading, wired with \`aria-expanded\` and \`aria-controls\` to its panel. Arrow keys move between triggers, Home/End jump to the first/last, and Enter/Space toggle the active item.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — surface, border weight/color, radius, and the chevron rotation all derive from theme variables.
`.trim(),
      },
    },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["single", "multiple"],
      description: "Whether one or several items can be open at once.",
      table: { type: { summary: '"single" | "multiple"' } },
    },
    collapsible: {
      control: "boolean",
      description: 'When `type="single"`, allow the open item to be collapsed back to none.',
      table: { defaultValue: { summary: "false" } },
    },
    defaultValue: {
      control: false,
      description: "Item value(s) open by default in uncontrolled mode.",
    },
    value: { control: false, description: "Controlled open item value(s)." },
    disabled: {
      control: "boolean",
      description: "Disable interaction across all items.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: { type: "single" },
} satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Single-select and `collapsible`, so opening one item closes the others.",
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible defaultValue="a" className="w-[480px]">
      <AccordionItem value="a">
        <AccordionTrigger>What is @fv/ui?</AccordionTrigger>
        <AccordionContent>
          A token-driven React component library with three switchable personalities.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes — interactive components are built on Radix primitives and tested with jest-axe.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Can I theme it?</AccordionTrigger>
        <AccordionContent>
          Override a handful of CSS variables, or use the Tweaks API.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
