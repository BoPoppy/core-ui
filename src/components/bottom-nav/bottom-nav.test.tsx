import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { BottomNav } from "./bottom-nav";

const items = [
  { value: "home", label: "Home", icon: <svg aria-hidden="true" /> },
  { value: "search", label: "Search", icon: <svg aria-hidden="true" /> },
  { value: "profile", label: "Profile", icon: <svg aria-hidden="true" /> },
];

describe("BottomNav", () => {
  it("renders a nav element with all item labels", () => {
    render(<BottomNav items={items} value="home" onValueChange={vi.fn()} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /profile/i })).toBeInTheDocument();
  });

  it("marks the active item with aria-current=page", () => {
    render(<BottomNav items={items} value="search" onValueChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: /search/i })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: /home/i })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("button", { name: /profile/i })).not.toHaveAttribute("aria-current");
  });

  it("calls onValueChange with the correct value when a button is clicked", async () => {
    const onValueChange = vi.fn();
    render(<BottomNav items={items} value="home" onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("button", { name: /search/i }));
    expect(onValueChange).toHaveBeenCalledOnce();
    expect(onValueChange).toHaveBeenCalledWith("search");
  });

  it("calls onValueChange for each item when clicked", async () => {
    const onValueChange = vi.fn();
    render(<BottomNav items={items} value="home" onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("button", { name: /profile/i }));
    expect(onValueChange).toHaveBeenCalledWith("profile");
  });

  it("applies a custom className to the nav element", () => {
    render(<BottomNav items={items} value="home" onValueChange={vi.fn()} className="custom-class" />);
    expect(screen.getByRole("navigation")).toHaveClass("custom-class");
  });

  it("renders with no items without crashing", () => {
    render(<BottomNav items={[]} value="" onValueChange={vi.fn()} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("has no axe violations", async () => {
    const { container } = render(<BottomNav items={items} value="home" onValueChange={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
