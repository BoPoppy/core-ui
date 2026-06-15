import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Timeline } from "./timeline";

const basicItems = [
  { title: "Step one", description: "First thing", time: "9:00 AM", status: "done" as const },
  { title: "Step two", description: "Second thing", time: "10:00 AM", status: "active" as const },
  { title: "Step three", status: "upcoming" as const },
];

describe("Timeline", () => {
  it("renders all item titles", () => {
    render(<Timeline items={basicItems} />);
    expect(screen.getByText("Step one")).toBeInTheDocument();
    expect(screen.getByText("Step two")).toBeInTheDocument();
    expect(screen.getByText("Step three")).toBeInTheDocument();
  });

  it("renders descriptions when provided", () => {
    render(<Timeline items={basicItems} />);
    expect(screen.getByText("First thing")).toBeInTheDocument();
    expect(screen.getByText("Second thing")).toBeInTheDocument();
  });

  it("renders time labels when provided", () => {
    render(<Timeline items={basicItems} />);
    expect(screen.getByText("9:00 AM")).toBeInTheDocument();
    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
  });

  it("omits description and time when not provided", () => {
    render(<Timeline items={[{ title: "Only title" }]} />);
    expect(screen.getByText("Only title")).toBeInTheDocument();
  });

  it("applies a custom className to the list element", () => {
    render(<Timeline items={basicItems} className="my-custom-class" />);
    expect(screen.getByRole("list")).toHaveClass("my-custom-class");
  });

  it("renders the correct number of list items", () => {
    render(<Timeline items={basicItems} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(basicItems.length);
  });

  it("has no axe violations", async () => {
    const { container } = render(<Timeline items={basicItems} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
