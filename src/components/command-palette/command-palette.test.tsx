import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { type CommandItem, CommandPalette } from "./command-palette";

function makeItems(onSelect: () => void): CommandItem[] {
  return [
    { id: "new", label: "New file", onSelect },
    { id: "open", label: "Open project", onSelect: () => {} },
    { id: "settings", label: "Settings", onSelect: () => {} },
  ];
}

describe("CommandPalette", () => {
  it("filters items by query", async () => {
    render(<CommandPalette open onOpenChange={() => {}} items={makeItems(() => {})} />);
    expect(screen.getAllByRole("option")).toHaveLength(3);
    await userEvent.keyboard("set");
    expect(screen.getByRole("option")).toHaveTextContent("Settings");
  });

  it("runs the active item on Enter and closes", async () => {
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    render(<CommandPalette open onOpenChange={onOpenChange} items={makeItems(onSelect)} />);
    await userEvent.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
