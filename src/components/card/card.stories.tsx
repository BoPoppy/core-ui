import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../badge/badge";
import { Button } from "../button/button";
import { Card, CardBody, CardFooter, CardMedia, CardText, CardTitle } from "./card";

const meta = {
  title: "Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
