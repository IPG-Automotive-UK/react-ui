import * as React from "react";

import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { ClearFilterButton } from "./ClearFilterButton";
import userEvent from "@testing-library/user-event";

// Default props
const defaultProps = {
  count: 0,
  onClick: vi.fn()
};

// Tests
describe("ClearFilterButton", () => {
  test("Click on clear filter button", async () => {
    render(<ClearFilterButton {...defaultProps} />);

    // Click on clear filter button
    const clearFilterButton = screen.getByTestId("filter-clear-button");
    await userEvent.click(clearFilterButton);

    // Check that onClick is called
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
