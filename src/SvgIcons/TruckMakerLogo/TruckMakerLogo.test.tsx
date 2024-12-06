import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import React from "react";
import { TruckMakerLogo } from "./TruckMakerLogo";

describe("`TruckMakerLogo` tests", () => {
  test("renders `TruckMakerLogo` with no props passed", () => {
    render(<TruckMakerLogo />);

    // find the elements of interest
    const roadIconElement = screen.getByTestId("truck-maker-logo");

    // check if elements captured match expectations
    expect(roadIconElement).toBeInTheDocument();
  });
  test("renders `TruckMakerLogo` with custom sx props", () => {
    render(<TruckMakerLogo sx={{ height: 25, width: 25 }} />);

    // find the elements of interest
    const roadIconElement = screen.getByTestId("truck-maker-logo");
    const style = window.getComputedStyle(roadIconElement);

    // check if elements captured match expectations
    expect(roadIconElement).toBeInTheDocument();
    expect(style.height).toBe("25px");
    expect(style.width).toBe("25px");
  });
});
