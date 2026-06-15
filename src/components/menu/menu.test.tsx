import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuLabel,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "./menu";

function BasicMenu({ onSelect }: { onSelect?: () => void }) {
  return (
    <Menu>
      <MenuTrigger>Open</MenuTrigger>
      <MenuContent>
        <MenuItem onSelect={onSelect}>Item One</MenuItem>
        <MenuItem>Item Two</MenuItem>
      </MenuContent>
    </Menu>
  );
}

describe("Menu", () => {
  it("renders the trigger button", () => {
    render(<BasicMenu />);
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("opens the menu content on trigger click", async () => {
    render(<BasicMenu />);
    await userEvent.click(screen.getByText("Open"));
    await waitFor(() => expect(screen.getByText("Item One")).toBeInTheDocument());
    expect(screen.getByText("Item Two")).toBeInTheDocument();
  });

  it("calls onSelect when a menu item is clicked", async () => {
    const onSelect = vi.fn();
    render(<BasicMenu onSelect={onSelect} />);
    await userEvent.click(screen.getByText("Open"));
    await waitFor(() => screen.getByText("Item One"));
    await userEvent.click(screen.getByText("Item One"));
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it("renders MenuItem with danger styling class", async () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger>Open</MenuTrigger>
        <MenuContent>
          <MenuItem danger>Delete</MenuItem>
        </MenuContent>
      </Menu>,
    );
    await waitFor(() => screen.getByText("Delete"));
    const item = screen.getByText("Delete").closest("[role='menuitem']");
    expect(item).toHaveClass("text-danger");
  });

  it("renders MenuItem with a shortcut hint", async () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger>Open</MenuTrigger>
        <MenuContent>
          <MenuItem shortcut="⌘K">Command</MenuItem>
        </MenuContent>
      </Menu>,
    );
    await waitFor(() => screen.getByText("Command"));
    expect(screen.getByText("⌘K")).toBeInTheDocument();
  });

  it("renders MenuLabel and MenuSeparator inside MenuGroup", async () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger>Open</MenuTrigger>
        <MenuContent>
          <MenuGroup>
            <MenuLabel>Section</MenuLabel>
            <MenuItem>Grouped Item</MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem>Other Item</MenuItem>
        </MenuContent>
      </Menu>,
    );
    await waitFor(() => screen.getByText("Section"));
    expect(screen.getByText("Section")).toBeInTheDocument();
    expect(screen.getByText("Grouped Item")).toBeInTheDocument();
    expect(screen.getByText("Other Item")).toBeInTheDocument();
  });

  it("does not render menu items when closed", () => {
    render(<BasicMenu />);
    expect(screen.queryByText("Item One")).not.toBeInTheDocument();
  });

  it("has no axe violations when open", async () => {
    const { container } = render(
      <Menu defaultOpen>
        <MenuTrigger>Open</MenuTrigger>
        <MenuContent>
          <MenuLabel>Options</MenuLabel>
          <MenuItem>Normal</MenuItem>
          <MenuItem danger>Danger</MenuItem>
          <MenuSeparator />
          <MenuItem shortcut="⌘Z">Undo</MenuItem>
        </MenuContent>
      </Menu>,
    );
    await waitFor(() => screen.getByText("Normal"));
    expect(await axe(container)).toHaveNoViolations();
  });
});
