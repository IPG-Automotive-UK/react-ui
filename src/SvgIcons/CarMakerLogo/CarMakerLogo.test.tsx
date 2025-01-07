import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { CarMakerLogo } from "./CarMakerLogo";
import React from "react";

describe("`CarMakerLogo` tests", () => {
  test("renders `CarMakerLogo` with no props passed", () => {
    render(<CarMakerLogo />);

    // find the elements of interest
    const roadIconElement = screen.getByTestId("car-maker-logo");

    // check if elements captured match expectations
    expect(roadIconElement).toBeInTheDocument();
  });
  test("renders `CarMakerLogo` with custom sx props", () => {
    render(<CarMakerLogo sx={{ height: 25, width: 25 }} />);

    // find the elements of interest
    const roadIconElement = screen.getByTestId("car-maker-logo");
    const style = window.getComputedStyle(roadIconElement);

    // check if elements captured match expectations
    expect(roadIconElement).toBeInTheDocument();
    expect(style.height).toBe("25px");
    expect(style.width).toBe("25px");
  });
});
