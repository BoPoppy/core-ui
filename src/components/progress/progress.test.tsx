import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { CircularProgress, Progress, Spinner } from "./progress";

describe("Progress", () => {
  it("renders with role=progressbar", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets aria-valuenow when value is provided", () => {
    render(<Progress value={75} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "75");
  });

  it("omits aria-valuenow when value is not provided (indeterminate)", () => {
    render(<Progress />);
    const bar = screen.getByRole("progressbar");
    expect(bar).not.toHaveAttribute("aria-valuenow");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Progress value={40} aria-label="Loading progress" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("CircularProgress", () => {
  it("renders with role=progressbar and correct aria-valuenow", () => {
    render(<CircularProgress value={60} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "60");
  });

  it("shows the label when showLabel is true", () => {
    render(<CircularProgress value={42} showLabel />);
    expect(screen.getByText("42%")).toBeInTheDocument();
  });

  it("does not show label by default", () => {
    render(<CircularProgress value={42} />);
    expect(screen.queryByText("42%")).not.toBeInTheDocument();
  });

  it("clamps values above 100 to 100", () => {
    render(<CircularProgress value={150} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "100");
  });
});

describe("Spinner", () => {
  it("renders with role=status and aria-label=Loading", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveAttribute("aria-label", "Loading");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Spinner />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
