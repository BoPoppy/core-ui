import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Banner } from "./banner";

describe("Banner", () => {
  it("renders children", () => {
    render(<Banner>System update available</Banner>);
    expect(screen.getByText("System update available")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<Banner description="Please refresh the page">Notice</Banner>);
    expect(screen.getByText("Please refresh the page")).toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(<Banner icon={<svg data-testid="icon" />}>Info</Banner>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders action when provided", () => {
    render(<Banner action={<button type="button">Retry</button>}>Error</Banner>);
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("calls onClose when dismiss button is clicked", async () => {
    const onClose = vi.fn();
    render(<Banner onClose={onClose}>Dismissible</Banner>);
    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not render dismiss button when onClose is not provided", () => {
    render(<Banner>No close</Banner>);
    expect(screen.queryByRole("button", { name: "Dismiss" })).not.toBeInTheDocument();
  });

  it("applies subtle variant class", () => {
    const { container } = render(<Banner variant="subtle">Subtle</Banner>);
    expect(container.firstChild).toHaveClass("bg-accent-soft");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Banner
        variant="solid"
        icon={<svg aria-hidden="true" />}
        description="Details here"
        onClose={vi.fn()}
      >
        Accessible Banner
      </Banner>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
