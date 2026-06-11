import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("renders an image with alt text", () => {
    render(<Avatar src="/me.png" alt="Tri Vo" />);
    expect(screen.getByRole("img", { name: "Tri Vo" })).toBeInTheDocument();
  });

  it("falls back to initials when no src", () => {
    render(<Avatar fallback="TV" />);
    expect(screen.getByText("TV")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<Avatar src="/me.png" alt="Tri Vo" status="online" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
