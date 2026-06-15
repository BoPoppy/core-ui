import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { SpeedDial } from "./speed-dial";

const mockActions = [
  { icon: <span>A</span>, label: "Action A", onClick: vi.fn() },
  { icon: <span>B</span>, label: "Action B", onClick: vi.fn() },
];

describe("SpeedDial", () => {
  it("renders the trigger button with default aria-label", () => {
    render(<SpeedDial actions={mockActions} />);
    expect(screen.getByRole("button", { name: "Actions" })).toBeInTheDocument();
  });

  it("does not show action buttons when closed", () => {
    render(<SpeedDial actions={mockActions} />);
    expect(screen.queryByRole("button", { name: "Action A" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Action B" })).not.toBeInTheDocument();
  });

  it("shows action buttons after clicking the trigger", async () => {
    render(<SpeedDial actions={mockActions} />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("button", { name: "Action A" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Action B" })).toBeInTheDocument();
  });

  it("sets aria-expanded on the trigger button based on open state", async () => {
    render(<SpeedDial actions={mockActions} />);
    const trigger = screen.getByRole("button", { name: "Actions" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("calls the action onClick when an action is clicked", async () => {
    const onClick = vi.fn();
    const actions = [{ icon: <span>X</span>, label: "Do thing", onClick }];
    render(<SpeedDial actions={actions} />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await userEvent.click(screen.getByRole("button", { name: "Do thing" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("has no axe violations when open", async () => {
    const { container } = render(<SpeedDial actions={mockActions} aria-label="Speed dial" />);
    await userEvent.click(screen.getByRole("button", { name: "Speed dial" }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
