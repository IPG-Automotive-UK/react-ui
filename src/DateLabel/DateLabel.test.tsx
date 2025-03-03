import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import DateLabel from "./DateLabel";
import React from "react";

describe("`DateLabel` tests", () => {
  test("renders `DateLabel` with a href", () => {
    render(<DateLabel label="10-09-24 10:24:08" />);

    // find the elements of interest
    const iconWithLabelElement = screen.getByTestId("icon-with-label");
    const iconElement = screen.getByTestId("date-icon");
    const anchorElement = screen.queryByRole("link");

    // check if elements captured match expectations
    expect(iconWithLabelElement).toBeInTheDocument();
    expect(iconWithLabelElement).toHaveTextContent("10-09-24 10:24:08");
    expect(iconElement).toBeInTheDocument();
    expect(anchorElement).not.toBeInTheDocument();
  });
  test("should render `DateLabel` component with tooltip component if 'tooltip' prop is present", () => {
    render(<DateLabel label="10-09-24 10:24:08" tooltip="Tooltip Text" />);

    // find the element of interest
    const tooltip = screen.getByTestId("icon-tooltip");

    // check if tooltip appears
    expect(tooltip).toBeInTheDocument();
  });
});
