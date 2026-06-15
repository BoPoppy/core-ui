import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { ButtonGroup, ButtonGroupItem } from "./button-group";

describe("ButtonGroup", () => {
  it("renders children inside action group mode", () => {
    render(
      <ButtonGroup>
        <button type="button">Save</button>
        <button type="button">Duplicate</button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Duplicate" })).toBeInTheDocument();
  });

  it("renders as a toggle group when type=single", () => {
    render(
      <ButtonGroup type="single" defaultValue="day">
        <ButtonGroupItem value="day">Day</ButtonGroupItem>
        <ButtonGroupItem value="week">Week</ButtonGroupItem>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Day" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Week" })).toBeInTheDocument();
  });

  it("reflects defaultValue selection in type=single mode", () => {
    render(
      <ButtonGroup type="single" defaultValue="week">
        <ButtonGroupItem value="day">Day</ButtonGroupItem>
        <ButtonGroupItem value="week">Week</ButtonGroupItem>
      </ButtonGroup>,
    );
    expect(screen.getByRole("radio", { name: "Week" })).toHaveAttribute("data-state", "on");
    expect(screen.getByRole("radio", { name: "Day" })).toHaveAttribute("data-state", "off");
  });

  it("calls onValueChange when a ButtonGroupItem is clicked in type=single mode", async () => {
    const onValueChange = vi.fn();
    render(
      <ButtonGroup type="single" onValueChange={onValueChange}>
        <ButtonGroupItem value="day">Day</ButtonGroupItem>
        <ButtonGroupItem value="week">Week</ButtonGroupItem>
      </ButtonGroup>,
    );
    await userEvent.click(screen.getByRole("radio", { name: "Day" }));
    expect(onValueChange).toHaveBeenCalledWith("day");
  });

  it("supports multiple selection in type=multiple mode", async () => {
    render(
      <ButtonGroup type="multiple" defaultValue={["day"]}>
        <ButtonGroupItem value="day">Day</ButtonGroupItem>
        <ButtonGroupItem value="week">Week</ButtonGroupItem>
      </ButtonGroup>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Week" }));
    expect(screen.getByRole("button", { name: "Day" })).toHaveAttribute("data-state", "on");
    expect(screen.getByRole("button", { name: "Week" })).toHaveAttribute("data-state", "on");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <ButtonGroup type="single" defaultValue="day">
        <ButtonGroupItem value="day">Day</ButtonGroupItem>
        <ButtonGroupItem value="week">Week</ButtonGroupItem>
      </ButtonGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
