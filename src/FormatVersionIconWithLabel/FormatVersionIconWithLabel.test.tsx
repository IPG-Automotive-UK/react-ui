import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import FormatVersionIconWithLabel from "./FormatVersionIconWithLabel";
import React from "react";

describe("IconWithLabel tests", () => {
  test("renders `IconWithLabel` with a href", () => {
    render(<FormatVersionIconWithLabel label="11.1" />);

    // find the elements of interest
    const iconWithLabelElement = screen.getByTestId("icon-with-label");
    const iconElement = screen.getByTestId("format-version-icon");
    const anchorElement = screen.queryByRole("link");

    // check if elements captured match expectations
    expect(iconWithLabelElement).toBeInTheDocument();
    expect(iconWithLabelElement).toHaveTextContent("11.1");
    expect(iconElement).toBeInTheDocument();
    expect(anchorElement).not.toBeInTheDocument();
  });
});
