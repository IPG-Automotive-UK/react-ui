import * as React from "react";

import { describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import { SidebarFilter } from "./SidebarFilter";
import userEvent from "@testing-library/user-event";

// Default props
const defaultProps = {
  onClear: vi.fn()
};

// Tests
describe("SidebarFilter", () => {
  test("Render children in sidebar", async () => {
    render(<SidebarFilter {...defaultProps}>Child text</SidebarFilter>);

    // Check that the children are not initially rendered
    expect(screen.queryByText("Child text")).not.toBeInTheDocument();

    // Open sidebar
    const filterButton = screen.getByTestId("filter-open-button");
    await userEvent.click(filterButton);

    // Check sidebar and children rendering
    expect(screen.getByTestId("filter-sidebar-drawer")).toBeInTheDocument();
    expect(screen.getByText("Child text")).toBeInTheDocument();
  });

  test("Clear button does not render if count is 0", async () => {
    render(
      <SidebarFilter {...defaultProps} count={0}>
        Child text
      </SidebarFilter>
    );

    // Open sidebar
    const filterButton = screen.getByTestId("filter-open-button");
    await userEvent.click(filterButton);

    // Confirm clear button is not rendered
    expect(screen.queryByTestId("filter-clear-button")).not.toBeInTheDocument();
  });

  test("Shows clear button when count is greater than 0", async () => {
    render(
      <SidebarFilter {...defaultProps} count={1}>
        Child text
      </SidebarFilter>
    );

    // Open sidebar
    const filterButton = screen.getByTestId("filter-open-button");
    await userEvent.click(filterButton);

    // Confirm clear button is rendered
    expect(screen.getByTestId("filter-clear-button")).toBeInTheDocument();
  });

  test("Clear filters on click of clear button", async () => {
    const onClear = vi.fn();
    render(
      <SidebarFilter count={1} onClear={onClear}>
        Child text
      </SidebarFilter>
    );

    // Open sidebar
    const filterButton = screen.getByTestId("filter-open-button");
    await userEvent.click(filterButton);

    // Clear filters using clear button
    const clearButton = screen.getByTestId("filter-clear-button");
    await userEvent.click(clearButton);
    expect(onClear).toHaveBeenCalled();
  });

  test("Close sidebar on click of close button", async () => {
    render(
      <SidebarFilter {...defaultProps} count={1}>
        Child text
      </SidebarFilter>
    );

    // Open sidebar
    const filterButton = screen.getByTestId("filter-open-button");
    await userEvent.click(filterButton);

    // Confirm sidebar is open using findByTestId to handle async rendering
    expect(
      await screen.findByTestId("filter-sidebar-drawer")
    ).toBeInTheDocument();

    // Close sidebar
    const closeButton = screen.getByTestId("filter-close-button");
    await userEvent.click(closeButton);

    // Confirm sidebar is closed
    await waitFor(() =>
      expect(
        screen.queryByTestId("filter-sidebar-drawer")
      ).not.toBeInTheDocument()
    );
  });
});
