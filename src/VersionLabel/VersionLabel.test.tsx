import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import React from "react";
import VersionLabel from "./VersionLabel";

describe("`VersionLabel` tests", () => {
  test("renders `VersionLabel`", () => {
    render(<VersionLabel label="11.2" />);

    // find the elements of interest
    const iconWithLabelElement = screen.getByTestId("icon-with-label");
    const roadIconElement = screen.getByTestId("version-icon");
    const anchorElement = screen.queryByRole("link");

    // check if elements captured match expectations
    expect(iconWithLabelElement).toBeInTheDocument();
    expect(iconWithLabelElement).toHaveTextContent("11.2");
    expect(roadIconElement).toBeInTheDocument();
    expect(anchorElement).not.toBeInTheDocument();
  });
});
