import { render, screen } from "../TestUtils";

import DifferenceChip from "./DifferenceChip";
import React from "react";

describe("DifferenceChip Component", () => {
  const renderComponent = (value: number, unit: string) => {
    render(<DifferenceChip value={value} unit={unit} />);
  };

  test("renders with positive value and ArrowDropUp icon", () => {
    renderComponent(10);
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByTestId("ArrowDropUpIcon")).toBeInTheDocument();
  });

  test("renders with negative value and ArrowDropDown icon", () => {
    renderComponent(-5);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByTestId("ArrowDropDownIcon")).toBeInTheDocument();
  });

  test("render with positive value and unit", () => {
    renderComponent(10, "%");
    expect(screen.getByText("10%")).toBeInTheDocument();
  });

  test("render with negative value and unit", () => {
    renderComponent(-5, "ms");
    expect(screen.getByText("5ms")).toBeInTheDocument();
  });

  test("applies correct styles for positive value", () => {
    renderComponent(10, "%");
    const chip = screen.getByText("10%").closest(".MuiChip-root");
    expect(chip).toHaveStyle({
      backgroundColor: expect.stringContaining(
        "color-mix(in srgb, var(--ipg-palette-success-main) 12%, transparent)"
      )
    });
  });

  test("applies correct styles for negative value", () => {
    renderComponent(-5, "ms");
    const chip = screen.getByText("5ms").closest(".MuiChip-root");
    expect(chip).toHaveStyle({
      backgroundColor: expect.stringContaining(
        "color-mix(in srgb, var(--ipg-palette-error-main) 12%, transparent)"
      )
    });
  });
});
