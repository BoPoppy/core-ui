import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Calendar, DatePicker } from "./date-picker";

describe("Calendar", () => {
  it("renders day-of-week headers", () => {
    render(<Calendar />);
    expect(screen.getByText("Su")).toBeInTheDocument();
    expect(screen.getByText("Mo")).toBeInTheDocument();
    expect(screen.getByText("Sa")).toBeInTheDocument();
  });

  it("renders the correct month and year in the header", () => {
    render(<Calendar value={new Date(2024, 0, 15)} />);
    expect(screen.getByText("January 2024")).toBeInTheDocument();
  });

  it("marks the selected date as pressed", () => {
    const date = new Date(2024, 0, 15);
    render(<Calendar value={date} />);
    const btn = screen.getByRole("button", { name: date.toDateString() });
    expect(btn).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onSelect with the clicked date", async () => {
    const onSelect = vi.fn();
    render(<Calendar value={new Date(2024, 0, 1)} onSelect={onSelect} />);
    const target = new Date(2024, 0, 10);
    await userEvent.click(screen.getByRole("button", { name: target.toDateString() }));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith(target);
  });

  it("navigates to the previous month when Previous month is clicked", async () => {
    render(<Calendar value={new Date(2024, 5, 1)} />);
    await userEvent.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText("May 2024")).toBeInTheDocument();
  });

  it("navigates to the next month when Next month is clicked", async () => {
    render(<Calendar value={new Date(2024, 5, 1)} />);
    await userEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("July 2024")).toBeInTheDocument();
  });
});

describe("DatePicker", () => {
  it("renders the trigger button with default placeholder", () => {
    render(<DatePicker />);
    expect(screen.getByRole("button", { name: "Pick a date" })).toBeInTheDocument();
  });

  it("displays the formatted selected date via defaultValue", () => {
    const date = new Date(2024, 0, 15);
    render(<DatePicker defaultValue={date} />);
    expect(screen.getByText(date.toLocaleDateString())).toBeInTheDocument();
  });

  it("uses a custom format function for display", () => {
    const date = new Date(2024, 0, 15);
    render(<DatePicker value={date} format={() => "custom-format"} />);
    expect(screen.getByText("custom-format")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<DatePicker disabled />);
    expect(screen.getByRole("button", { name: "Pick a date" })).toBeDisabled();
  });

  it("has no axe violations", async () => {
    const { container } = render(<DatePicker aria-label="Pick a date" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
