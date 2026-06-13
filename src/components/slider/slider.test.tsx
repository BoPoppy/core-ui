import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Slider } from "./slider";

describe("Slider", () => {
  it("labels the thumb with the visible field label", () => {
    render(<Slider label="Volume" defaultValue={[65]} />);
    expect(screen.getByRole("slider", { name: "Volume" })).toBeInTheDocument();
  });

  it("gives each thumb a distinct name for a range", () => {
    render(<Slider label="Price" defaultValue={[25, 75]} />);
    expect(screen.getByRole("slider", { name: "Price 1" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Price 2" })).toBeInTheDocument();
  });

  it("falls back to a generic name when no label is given", () => {
    render(<Slider defaultValue={[50]} />);
    expect(screen.getByRole("slider", { name: "Value" })).toBeInTheDocument();
  });

  it("renders a value bubble per thumb by default", () => {
    render(<Slider label="Price" defaultValue={[25, 75]} />);
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  it("hides the value bubble when showValue is false", () => {
    render(<Slider label="Volume" defaultValue={[65]} showValue={false} />);
    expect(screen.queryByText("65")).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<Slider label="Volume" defaultValue={[65]} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
