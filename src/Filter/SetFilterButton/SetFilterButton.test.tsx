import * as React from "react";

import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { SetFilterButton } from "./SetFilterButton";
import userEvent from "@testing-library/user-event";

// Default props
const defaultProps = {
  count: 0,
  onClick: vi.fn()
};

// Tests
describe("SetFilterButton", () => {
  test("Render filter button", () => {
    render(<SetFilterButton {...defaultProps} />);

    // Check that the filter button is rendered
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });
  test("Render filter button with count", () => {
    render(<SetFilterButton {...defaultProps} count={1} />);

    // Check that the filter button is rendered with count 1
    expect(screen.getByText("Filters (1)")).toBeInTheDocument();
  });
  test("Click on filter button", async () => {
    render(<SetFilterButton {...defaultProps} />);

    // Click on filter button
    const filterButton = screen.getByTestId("filter-open-button");
    await userEvent.click(filterButton);

    // Check that onClick is called
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
