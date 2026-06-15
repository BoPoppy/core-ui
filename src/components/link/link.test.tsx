import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Link } from "./link";

describe("Link", () => {
  it("renders its children", () => {
    render(<Link href="/home">Go home</Link>);
    expect(screen.getByRole("link", { name: "Go home" })).toBeInTheDocument();
  });

  it("renders with the correct href", () => {
    render(<Link href="/about">About</Link>);
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  });

  it("applies default variant classes", () => {
    render(<Link href="#">Default</Link>);
    const link = screen.getByRole("link", { name: "Default" });
    expect(link).toHaveClass("text-accent");
  });

  it("merges custom className", () => {
    render(
      <Link href="#" className="custom-class">
        Styled
      </Link>,
    );
    expect(screen.getByRole("link", { name: "Styled" })).toHaveClass("custom-class");
  });

  it("fires onClick when clicked", async () => {
    const onClick = vi.fn();
    render(
      <Link href="#" onClick={onClick}>
        Click me
      </Link>,
    );
    await userEvent.click(screen.getByRole("link", { name: "Click me" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("has no axe violations", async () => {
    const { container } = render(<Link href="/accessible">Accessible link</Link>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
