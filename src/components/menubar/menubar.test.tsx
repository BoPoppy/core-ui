import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./menubar";

function BasicMenubar({ onSelect }: { onSelect?: () => void }) {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={onSelect}>New</MenubarItem>
          <MenubarSeparator />
          <MenubarItem shortcut="⌘S">Save</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

describe("Menubar", () => {
  it("renders the trigger text", () => {
    render(<BasicMenubar />);
    expect(screen.getByText("File")).toBeInTheDocument();
  });

  it("applies a custom className to Menubar root", () => {
    const { container } = render(
      <Menubar className="custom-root">
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
        </MenubarMenu>
      </Menubar>,
    );
    expect(container.firstChild).toHaveClass("custom-root");
  });

  it("opens content and shows menu items when trigger is clicked", async () => {
    render(<BasicMenubar />);
    await userEvent.click(screen.getByText("File"));
    await waitFor(() => expect(screen.getByText("New")).toBeInTheDocument());
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders the shortcut text inside a menu item", async () => {
    render(<BasicMenubar />);
    await userEvent.click(screen.getByText("File"));
    await waitFor(() => expect(screen.getByText("⌘S")).toBeInTheDocument());
  });

  it("calls onSelect when a menu item is selected", async () => {
    const onSelect = vi.fn();
    render(<BasicMenubar onSelect={onSelect} />);
    await userEvent.click(screen.getByText("File"));
    await waitFor(() => expect(screen.getByText("New")).toBeInTheDocument());
    await userEvent.click(screen.getByText("New"));
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it("has no axe violations", async () => {
    const { container } = render(<BasicMenubar />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
