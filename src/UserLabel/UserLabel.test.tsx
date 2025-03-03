import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import React from "react";
import UserLabel from "./UserLabel";

describe("`UserLabel` tests", () => {
  test("renders `UserLabel`", () => {
    render(<UserLabel label="James Harper" />);

    // find the elements of interest
    const iconWithLabelElement = screen.getByTestId("icon-with-label");
    const iconElement = screen.getByTestId("user-avatar");
    const iconElementStyle = getComputedStyle(iconElement);
    const anchorElement = screen.queryByRole("link");

    // check if elements captured match expectations
    expect(iconWithLabelElement).toBeInTheDocument();
    expect(iconWithLabelElement).toHaveTextContent("James Harper");
    expect(iconElement).toBeInTheDocument();
    expect(iconElementStyle.backgroundColor).toBe("rgb(0, 0, 0)");
    expect(anchorElement).not.toBeInTheDocument();
  });
  test("renders `UserLabel` with a custom color", () => {
    render(<UserLabel label="James Harper" color="#EC407A" />);

    // find the elements of interest
    const iconWithLabelElement = screen.getByTestId("icon-with-label");
    const iconElement = screen.getByTestId("user-avatar");
    const iconElementStyle = getComputedStyle(iconElement);
    const anchorElement = screen.queryByRole("link");

    // check if elements captured match expectations
    expect(iconWithLabelElement).toBeInTheDocument();
    expect(iconWithLabelElement).toHaveTextContent("James Harper");
    expect(iconElement).toBeInTheDocument();
    expect(iconElementStyle.backgroundColor).toBe("rgb(236, 64, 122)");
    expect(anchorElement).not.toBeInTheDocument();
  });

  test("should render `UserLabel` component with tooltip component if 'tooltip' prop is present", () => {
    render(
      <UserLabel label="James Harper" color="#EC407A" tooltip="Tooltip Text" />
    );

    // find the element of interest
    const tooltip = screen.getByTestId("icon-tooltip");

    // check if tooltip appears
    expect(tooltip).toBeInTheDocument();
  });
});
