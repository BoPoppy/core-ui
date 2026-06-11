import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./pagination";

describe("Pagination", () => {
  it("marks the current page and navigates", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={3} count={10} onPageChange={onPageChange} />);
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute("aria-current", "page");
    await userEvent.click(screen.getByRole("button", { name: "Page 4" }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("disables prev on the first page", () => {
    render(<Pagination page={1} count={10} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
  });
});
