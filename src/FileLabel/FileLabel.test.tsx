import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import FileLabel from "./FileLabel";
import React from "react";

describe("`FileLabel` tests", () => {
  test("renders `FileLabel`", () => {
    render(<FileLabel label="My File" />);

    // find the elements of interest
    const iconWithLabelElement = screen.getByTestId("icon-with-label");
    const iconElement = screen.getByTestId("file-icon");
    const anchorElement = screen.queryByRole("link");

    // check if elements captured match expectations
    expect(iconWithLabelElement).toBeInTheDocument();
    expect(iconWithLabelElement).toHaveTextContent("My Road");
    expect(iconElement).toBeInTheDocument();
    expect(anchorElement).not.toBeInTheDocument();
  });
});
