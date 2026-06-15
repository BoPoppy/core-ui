import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { AppBar, AppBarIcon, AppBarSpacer, AppBarTitle } from "./app-bar";

describe("AppBar", () => {
  it("renders as a header landmark", () => {
    render(<AppBar>content</AppBar>);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders children inside the header", () => {
    render(
      <AppBar>
        <span>Hello</span>
      </AppBar>,
    );
    expect(screen.getByRole("banner")).toHaveTextContent("Hello");
  });

  it("applies additional className", () => {
    render(<AppBar className="custom-class">x</AppBar>);
    expect(screen.getByRole("banner")).toHaveClass("custom-class");
  });
});

describe("AppBarTitle", () => {
  it("renders its text content", () => {
    render(<AppBarTitle>Dashboard</AppBarTitle>);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});

describe("AppBarIcon", () => {
  it("renders as a button and fires onClick", async () => {
    const onClick = vi.fn();
    render(
      <AppBarIcon aria-label="Menu" onClick={onClick}>
        ☰
      </AppBarIcon>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Menu" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe("AppBarSpacer", () => {
  it("renders without error", () => {
    const { container } = render(<AppBarSpacer />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe("AppBar composition", () => {
  it("renders all sub-components together with no axe violations", async () => {
    const { container } = render(
      <AppBar>
        <AppBarIcon aria-label="Menu">☰</AppBarIcon>
        <AppBarTitle>Dashboard</AppBarTitle>
        <AppBarSpacer />
      </AppBar>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
