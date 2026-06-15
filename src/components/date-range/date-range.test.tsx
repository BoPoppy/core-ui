import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { DateRangePicker, RangeCalendar } from "./date-range";

describe("RangeCalendar", () => {
  it("renders day-of-week headers and navigation buttons", () => {
    render(<RangeCalendar />);
    expect(screen.getByText("Su")).toBeInTheDocument();
    expect(screen.getByText("Sa")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous month" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next month" })).toBeInTheDocument();
  });

  it("displays the month and year from a provided start date", () => {
    render(<RangeCalendar value={{ start: new Date(2024, 2, 15) }} />);
    expect(screen.getByText("March 2024")).toBeInTheDocument();
  });

  it("navigates to the next month when Next month is clicked", async () => {
    render(<RangeCalendar value={{ start: new Date(2024, 0, 1) }} />);
    expect(screen.getByText("January 2024")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("February 2024")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <RangeCalendar value={{ start: new Date(2024, 2, 5), end: new Date(2024, 2, 10) }} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("DateRangePicker", () => {
  it("renders the trigger button with placeholder text", () => {
    render(<DateRangePicker />);
    expect(screen.getByRole("button", { name: "Pick a date range" })).toBeInTheDocument();
  });

  it("renders a custom placeholder", () => {
    render(<DateRangePicker placeholder="Select dates" />);
    expect(screen.getByRole("button", { name: "Select dates" })).toBeInTheDocument();
  });

  it("displays the formatted range when a controlled value is provided", () => {
    const start = new Date(2024, 2, 5);
    const end = new Date(2024, 2, 10);
    render(<DateRangePicker value={{ start, end }} />);
    expect(
      screen.getByText(`${start.toLocaleDateString()} – ${end.toLocaleDateString()}`),
    ).toBeInTheDocument();
  });

  it("is disabled when the disabled prop is set", () => {
    render(<DateRangePicker disabled />);
    expect(screen.getByRole("button", { name: "Pick a date range" })).toBeDisabled();
  });

  it("has no axe violations", async () => {
    const { container } = render(<DateRangePicker placeholder="Pick a date range" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
