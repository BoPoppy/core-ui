import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders as a span element", () => {
    render(<Badge>Label</Badge>);
    const badge = screen.getByText("Label");
    expect(badge.tagName).toBe("SPAN");
  });

  it("applies neutral variant classes by default", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge).toHaveClass("bg-surface-2", "text-fg");
  });

  it("applies accent variant classes", () => {
    render(<Badge variant="accent">Accent</Badge>);
    const badge = screen.getByText("Accent");
    expect(badge).toHaveClass("bg-accent", "text-accent-fg");
  });

  it("applies success variant classes", () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText("Success");
    expect(badge).toHaveClass("bg-success-soft", "text-success");
  });

  it("applies danger variant classes", () => {
    render(<Badge variant="danger">Danger</Badge>);
    const badge = screen.getByText("Danger");
    expect(badge).toHaveClass("bg-danger-soft", "text-danger");
  });

  it("renders a dot span with aria-hidden when dot prop is true", () => {
    render(<Badge dot>With Dot</Badge>);
    const dot = document.querySelector('[aria-hidden="true"]');
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveClass("rounded-full", "bg-current");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Badge variant="success">Accessible</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
