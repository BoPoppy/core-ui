import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Card, CardBody, CardFooter, CardMedia, CardText, CardTitle } from "./card";

describe("Card", () => {
  it("renders children inside Card", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies custom className to Card", () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders CardMedia with children", () => {
    render(<CardMedia>Media content</CardMedia>);
    expect(screen.getByText("Media content")).toBeInTheDocument();
  });

  it("renders CardBody with CardTitle and CardText", () => {
    render(
      <CardBody>
        <CardTitle>My Title</CardTitle>
        <CardText>Some description text</CardText>
      </CardBody>,
    );
    expect(screen.getByText("My Title")).toBeInTheDocument();
    expect(screen.getByText("Some description text")).toBeInTheDocument();
  });

  it("renders CardTitle as an h3 element", () => {
    render(<CardTitle>Heading</CardTitle>);
    expect(screen.getByRole("heading", { level: 3, name: "Heading" })).toBeInTheDocument();
  });

  it("renders CardFooter with children", () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("renders a fully composed Card", () => {
    render(
      <Card>
        <CardMedia>Image area</CardMedia>
        <CardBody>
          <CardTitle>Card Title</CardTitle>
          <CardText>Card description</CardText>
        </CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByRole("heading", { level: 3, name: "Card Title" })).toBeInTheDocument();
    expect(screen.getByText("Card description")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
    expect(screen.getByText("Image area")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Card>
        <CardMedia>Image placeholder</CardMedia>
        <CardBody>
          <CardTitle>Accessible Card</CardTitle>
          <CardText>This card is accessible.</CardText>
        </CardBody>
        <CardFooter>Actions</CardFooter>
      </Card>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
