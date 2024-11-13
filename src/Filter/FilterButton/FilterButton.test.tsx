import * as React from "react";

import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { FilterButton } from "./FilterButton";
import userEvent from "@testing-library/user-event";

// Default props
const defaultProps = {
  count: 0,
  onClick: vi.fn()
};

// Tests
describe("FilterButton", () => {
  test("Render filter button", () => {
    render(<FilterButton {...defaultProps} />);

    // Check that the filter button is rendered
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });
  test("Render filter button with count", () => {
    render(<FilterButton {...defaultProps} count={1} />);

    // Check that the filter button is rendered with count 1
    expect(screen.getByText("Filters (1)")).toBeInTheDocument();
  });
  test("Click on filter button", async () => {
    render(<FilterButton {...defaultProps} />);

    // Click on filter button
    const filterButton = screen.getByTestId("filter-open-button");
    await userEvent.click(filterButton);

    // Check that onClick is called
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
