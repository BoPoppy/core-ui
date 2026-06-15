import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Fab } from "./fab";

describe("Fab", () => {
  it("renders as a button with children", () => {
    render(<Fab aria-label="Add">+</Fab>);
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("fires onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Fab onClick={onClick} aria-label="Add" />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Fab onClick={onClick} aria-label="Add" disabled />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("merges custom className", () => {
    render(<Fab className="my-custom-class" aria-label="Add" />);
    expect(screen.getByRole("button")).toHaveClass("my-custom-class");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Fab aria-label="Add item" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
