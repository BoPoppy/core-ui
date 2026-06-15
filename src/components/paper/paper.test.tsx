import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Paper } from "./paper";

describe("Paper", () => {
  it("renders children", () => {
    render(<Paper>Content</Paper>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders as a div element", () => {
    render(<Paper data-testid="paper">Content</Paper>);
    expect(screen.getByTestId("paper").tagName).toBe("DIV");
  });

  it("applies elevation=0 class", () => {
    render(
      <Paper data-testid="paper" elevation={0}>
        Content
      </Paper>,
    );
    expect(screen.getByTestId("paper")).toHaveClass("shadow-none");
  });

  it("applies elevation=2 class", () => {
    render(
      <Paper data-testid="paper" elevation={2}>
        Content
      </Paper>,
    );
    expect(screen.getByTestId("paper")).toHaveClass("shadow-2");
  });

  it("forwards additional className", () => {
    render(
      <Paper data-testid="paper" className="custom-class">
        Content
      </Paper>,
    );
    expect(screen.getByTestId("paper")).toHaveClass("custom-class");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Paper>Accessible content</Paper>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
