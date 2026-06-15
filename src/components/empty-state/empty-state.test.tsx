import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders children", () => {
    render(<EmptyState>Some content</EmptyState>);
    expect(screen.getByText("Some content")).toBeInTheDocument();
  });

  it("renders the title when provided", () => {
    render(<EmptyState title="Nothing here" />);
    expect(screen.getByRole("heading", { name: "Nothing here" })).toBeInTheDocument();
  });

  it("renders the description when provided", () => {
    render(<EmptyState description="Try adding something." />);
    expect(screen.getByText("Try adding something.")).toBeInTheDocument();
  });

  it("renders the icon when provided", () => {
    render(<EmptyState icon={<svg data-testid="empty-icon" />} />);
    expect(screen.getByTestId("empty-icon")).toBeInTheDocument();
  });

  it("renders the action when provided", () => {
    render(<EmptyState action={<button type="button">Add item</button>} />);
    expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument();
  });

  it("applies a custom className", () => {
    const { container } = render(<EmptyState className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <EmptyState
        icon={<svg aria-hidden="true" />}
        title="No results"
        description="Try adjusting your search."
        action={<button type="button">Reset</button>}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
