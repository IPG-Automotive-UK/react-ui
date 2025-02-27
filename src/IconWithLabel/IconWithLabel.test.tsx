import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { CarMakerLogo } from "../SvgIcons";
import IconWithLabel from "./IconWithLabel";
import React from "react";
import userEvent from "@testing-library/user-event";

const defaultInputs = {
  icon: <CarMakerLogo />,
  label: "Example"
};

describe("IconWithLabel tests", () => {
  test("renders `IconWithLabel` with a href", () => {
    render(<IconWithLabel {...defaultInputs} href={"https://example.com"} />);

    // find the elements of interest
    const iconWithLabelElement = screen.getByTestId("icon-with-label");
    const anchorElement = screen.getByRole("link");

    // check if elements captured match expectations
    expect(iconWithLabelElement).toBeInTheDocument();
    expect(iconWithLabelElement).toHaveTextContent("Example");
    expect(anchorElement).toBeInTheDocument();
    expect(anchorElement).toHaveAttribute("href", "https://example.com");
  });
  test("renders `IconWithLabel` without an href", () => {
    render(<IconWithLabel {...defaultInputs} />);

    // find the elements of interest
    const iconWithLabelElement = screen.getByTestId("icon-with-label");
    const anchorElement = screen.queryByRole("link");

    // check if elements captured match expectations
    expect(iconWithLabelElement).toBeInTheDocument();
    expect(iconWithLabelElement).toHaveTextContent("Example");
    expect(anchorElement).not.toBeInTheDocument();
  });
  test("renders `IconWithLabel` without props such that text will truncate", () => {
    render(<IconWithLabel {...defaultInputs} />);

    // find the elements of interest
    const text = screen.getByText("Example");
    const parentElement = text.parentElement;
    const textStyle = window.getComputedStyle(text);

    // error if parent element is null
    if (parentElement === null) {
      throw new Error("The parent element did not render!");
    }
    const parentStyle = window.getComputedStyle(parentElement);

    // check if elements captured match expectations
    expect(textStyle.whiteSpace).toBe("nowrap");
    expect(textStyle.overflow).toBe("hidden");
    expect(textStyle.textOverflow).toBe("ellipsis");
    expect(parentStyle.minWidth).toBe("0");
  });
  test("renders `IconWithLabel` component with optional tooltip. Should show and hide tooltip on hover and hover leave respectively", async () => {
    render(
      <IconWithLabel
        icon={<CarMakerLogo />}
        label="Example"
        tooltip="Tooltip Text"
      />
    );

    // find the trigger element
    const tooltipTriggerElement = screen.getByTestId("icon-tooltip");

    // find the elements of interest
    let tooltip = screen.queryByRole("tooltip");

    // simulate hover effect
    await userEvent.hover(tooltipTriggerElement);

    // check if tooltip appears and is visible
    tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.firstChild).toHaveTextContent("Tooltip Text");
    expect(getComputedStyle(tooltip.children[0]).opacity).toBe("1");

    // unhover the trigger element
    await userEvent.unhover(tooltipTriggerElement);

    // ensure tooltip still exists but is not visible
    expect(getComputedStyle(tooltip.children[0]).opacity).toBe("0");
  });
});
