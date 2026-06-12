import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

const meta = {
  title: "Surfaces/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { type: "single" },
} satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
