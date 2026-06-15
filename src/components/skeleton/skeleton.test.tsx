import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders a div element", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("sets aria-hidden to true", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("applies default block variant class", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("rounded-sm");
  });

  it("applies circle variant class", () => {
    const { container } = render(<Skeleton variant="circle" />);
    expect(container.firstChild).toHaveClass("rounded-full");
  });

  it("merges custom className", () => {
    const { container } = render(<Skeleton className="w-32 h-32" />);
    expect(container.firstChild).toHaveClass("w-32", "h-32");
  });

  it("forwards additional HTML attributes", () => {
    const { container } = render(<Skeleton data-testid="my-skeleton" />);
    expect(container.firstChild).toHaveAttribute("data-testid", "my-skeleton");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Skeleton variant="block" className="w-48 h-6" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
