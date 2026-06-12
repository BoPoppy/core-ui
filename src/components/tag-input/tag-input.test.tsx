import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TagInput } from "./tag-input";

describe("TagInput", () => {
  it("adds a tag on Enter", async () => {
    const onValueChange = vi.fn();
    render(<TagInput onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox", { name: "Tags" });
    await userEvent.type(input, "design{Enter}");
    expect(onValueChange).toHaveBeenCalledWith(["design"]);
  });

  it("removes the last tag on Backspace when empty", async () => {
    const onValueChange = vi.fn();
    render(<TagInput defaultValue={["a", "b"]} onValueChange={onValueChange} />);
    await userEvent.type(screen.getByRole("textbox", { name: "Tags" }), "{Backspace}");
    expect(onValueChange).toHaveBeenCalledWith(["a"]);
  });

  it("removes a tag via its button", async () => {
    const onValueChange = vi.fn();
    render(<TagInput defaultValue={["x", "y"]} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Remove x" }));
    expect(onValueChange).toHaveBeenCalledWith(["y"]);
  });
});
