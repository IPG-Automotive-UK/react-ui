import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import FormatVersionLabel from "./FormatVersionLabel";
import React from "react";

describe("`FormatVersionLabel` tests", () => {
  test("renders `FormatVersionLabel`", () => {
    render(<FormatVersionLabel label="11.1" />);

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
