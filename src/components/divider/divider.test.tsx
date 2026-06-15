import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Divider } from "./divider";

describe("Divider", () => {
  it("renders a horizontal solid divider by default with aria-hidden", () => {
    const { container } = render(<Divider />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el).toHaveClass("h-px");
  });

  it("renders a dashed variant with the correct class", () => {
    const { container } = render(<Divider variant="dashed" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("border-dashed");
  });

  it("renders a vertical divider with aria-hidden", () => {
    const { container } = render(<Divider orientation="vertical" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el).toHaveClass("w-px");
  });

  it("renders children as a label inside the horizontal divider", () => {
    render(<Divider>Section</Divider>);
    expect(screen.getByText("Section")).toBeInTheDocument();
  });

  it("forwards a custom className", () => {
    const { container } = render(<Divider className="my-custom-class" />);
    expect(container.firstChild).toHaveClass("my-custom-class");
  });

  it("forwards additional props to the underlying div", () => {
    const { container } = render(<Divider data-testid="divider-el" />);
    expect(container.firstChild).toHaveAttribute("data-testid", "divider-el");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <div>
        <Divider />
        <Divider variant="dashed" />
        <Divider orientation="vertical" />
        <Divider>Section</Divider>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
