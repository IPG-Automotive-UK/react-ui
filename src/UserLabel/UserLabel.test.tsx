import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import React from "react";
import UserLabel from "./UserLabel";
import userEvent from "@testing-library/user-event";

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
  test("renders `UserLabel` with a tooltip on hover of the icon and hides it back on unhover", async () => {
    render(
      <UserLabel label="James Harper" color="#EC407A" tooltip="Tooltip Text" />
    );

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
