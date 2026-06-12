import type { Meta, StoryObj } from "@storybook/react-vite";
import { Carousel } from "./carousel";

const meta = {
  title: "Surfaces/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A horizontal slide track that shows one item at a time, with prev/next arrows and dot indicators. Each child element is treated as a slide.

### When to use
- Cycling through a small set of equally-weighted items (featured cards, images, onboarding panels).
- When horizontal space is limited and showing all items at once isn't practical.

Avoid hiding essential content behind a carousel — items past the first are easy to miss. For a static gallery, lay items out in a grid instead.

### Usage
\`\`\`tsx
import { Carousel } from "@fv/ui";

// Uncontrolled
<Carousel defaultIndex={0}>
  <Slide n={1} />
  <Slide n={2} />
  <Slide n={3} />
</Carousel>

// Controlled
<Carousel index={i} onIndexChange={setI} hideArrows>
  {slides}
</Carousel>
\`\`\`

### Accessibility
- The container has \`aria-roledescription="carousel"\` and each slide \`aria-roledescription="slide"\`; off-screen slides are marked \`aria-hidden\`.
- Arrows and dots are native \`<button>\`s with labels ("Previous slide", "Next slide", "Go to slide N"); the active dot carries \`aria-current\`.
- Navigation wraps around (going past the last slide returns to the first).

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark themes — border weight, radius, the accent dot and the slide-transition easing all come from CSS tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    index: {
      control: false,
      description: "Controlled active slide index. Pair with `onIndexChange`.",
      table: { type: { summary: "number" } },
    },
    defaultIndex: {
      control: "number",
      description: "Initial active slide when uncontrolled.",
      table: { type: { summary: "number" }, defaultValue: { summary: "0" } },
    },
    onIndexChange: {
      control: false,
      description: "Called with the new index whenever the active slide changes.",
      table: { type: { summary: "(index: number) => void" } },
    },
    hideArrows: {
      control: "boolean",
      description: "Hide the prev/next arrows, leaving only the dot indicators.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof Carousel>;
export default meta;
type Story = StoryObj<typeof meta>;

const Slide = ({ n }: { n: number }) => (
  <div className="grid h-48 place-items-center bg-accent-soft text-2xl font-bold text-fg">
    Slide {n}
  </div>
);

export const Default: Story = {
  render: () => (
    <Carousel className="w-[480px]">
      <Slide n={1} />
      <Slide n={2} />
      <Slide n={3} />
    </Carousel>
  ),
};
