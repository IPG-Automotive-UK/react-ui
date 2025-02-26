import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import DateLabel from "./DateLabel";
import React from "react";
import userEvent from "@testing-library/user-event";

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
  test("renders `DateLabel` with a tooltip on hover of the icon and hides it back on unhover", async () => {
    render(<DateLabel label="10-09-24 10:24:08" tooltip="Tooltip Text" />);

    // find the trigger element
    const tooltipTriggerElement = screen.getByTestId("icon-tooltip");

    // find the elements of interest and verify it's not in document yet
    let tooltip = screen.queryByRole("tooltip");
    expect(tooltip).not.toBeInTheDocument();

    // simulate hover effect
    await userEvent.hover(tooltipTriggerElement);

    // check if tooltip appears and is visible
    tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(getComputedStyle(tooltip.children[0]).opacity).toBe("1");

    // unhover the trigger element
    await userEvent.unhover(tooltipTriggerElement);

    // ensure tooltip still exists but is not visible
    expect(getComputedStyle(tooltip.children[0]).opacity).toBe("0");
  });
});
