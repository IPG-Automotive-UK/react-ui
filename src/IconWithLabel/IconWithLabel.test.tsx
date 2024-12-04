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
});
