import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Rating } from "./rating";

describe("Rating", () => {
  it("sets a value on click", async () => {
    const onValueChange = vi.fn();
    render(<Rating onValueChange={onValueChange} aria-label="Score" />);
    await userEvent.click(screen.getByRole("button", { name: "4 stars" }));
    expect(onValueChange).toHaveBeenCalledWith(4);
  });

  it("increments with the arrow keys", async () => {
    const onValueChange = vi.fn();
    render(<Rating defaultValue={2} onValueChange={onValueChange} aria-label="Score" />);
    const slider = screen.getByRole("slider", { name: "Score" });
    slider.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalledWith(3);
  });

  it("has no axe violations", async () => {
    const { container } = render(<Rating value={3} readOnly aria-label="Score" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
