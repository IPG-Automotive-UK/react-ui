import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { CarMakerLogo } from "../SvgIcons";
import IconWithLabel from "./IconWithLabel";
import React from "react";

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
});
