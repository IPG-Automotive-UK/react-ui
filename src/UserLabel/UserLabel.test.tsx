import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import React from "react";
import UserLabel from "./UserLabel";

describe("`UserLabel` tests", () => {
  test("renders `UserLabel` with a href", () => {
    render(<UserLabel label="James Harper" />);

    // find the elements of interest
    const iconWithLabelElement = screen.getByTestId("icon-with-label");
    const iconElement = screen.getByTestId("user-avatar");
    const anchorElement = screen.queryByRole("link");

    // check if elements captured match expectations
    expect(iconWithLabelElement).toBeInTheDocument();
    expect(iconWithLabelElement).toHaveTextContent("James Harper");
    expect(iconElement).toBeInTheDocument();
    expect(anchorElement).not.toBeInTheDocument();
  });
});
