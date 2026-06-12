import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../badge/badge";
import { Button } from "../button/button";
import { Card, CardBody, CardFooter, CardMedia, CardText, CardTitle } from "./card";

const meta = {
  title: "Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A token-driven surface for grouping related content — a thumbnail, title, body and actions — into a single elevated block. Composed from sub-parts rather than configured by props.

### When to use
- Presenting a self-contained unit of content (a project, product, article) in a grid or list.
- When you need a bordered, elevated container that lifts on hover.

For a flat, structural surface with no elevation or hover, use Paper instead.

### Usage
\`\`\`tsx
import { Card, CardMedia, CardBody, CardTitle, CardText, CardFooter, Button } from "@fv/ui";

<Card className="w-72">
  <CardMedia>{/* image / preview */}</CardMedia>
  <CardBody>
    <CardTitle>Project Atlas</CardTitle>
    <CardText>A short description of the card contents.</CardText>
  </CardBody>
  <CardFooter>
    <Button size="sm">Open</Button>
  </CardFooter>
</Card>
\`\`\`

\`CardMedia\`, \`CardBody\`, \`CardTitle\`, \`CardText\` and \`CardFooter\` are optional and can appear in any order; each forwards its ref and accepts standard HTML props plus \`className\`.

### Accessibility
- Parts render as plain semantic elements: \`CardTitle\` is an \`<h3>\`, \`CardText\` a \`<p>\`, the rest \`<div>\`s — pick heading levels that fit the surrounding document outline.
- The card itself is not a button; if the whole card should be clickable, wrap an interactive element inside rather than adding \`onClick\` to the container.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark themes — surface, border weight, radius, shadow and the hover-lift transform all come from CSS tokens.
`.trim(),
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A complete card composed from `CardMedia`, `CardBody` (with `CardTitle` + `CardText`) and `CardFooter`.",
      },
    },
  },
  render: () => (
    <Card className="w-72">
      <CardMedia>preview</CardMedia>
      <CardBody>
        <div className="flex items-center justify-between">
          <CardTitle>Project Atlas</CardTitle>
          <Badge variant="success" dot>
            Live
          </Badge>
        </div>
        <CardText>
          A token-driven card that re-skins across Pebble, Slate, and Pop without changing markup.
        </CardText>
      </CardBody>
      <CardFooter>
        <Button variant="ghost" size="sm">
          Details
        </Button>
        <Button size="sm">Open</Button>
      </CardFooter>
    </Card>
  ),
};
