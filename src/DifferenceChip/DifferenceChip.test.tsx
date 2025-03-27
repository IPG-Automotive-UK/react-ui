import { render, screen } from "@testing-library/react";

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
    expect(screen.getByText("-5")).toBeInTheDocument();
    expect(screen.getByTestId("ArrowDropDownIcon")).toBeInTheDocument();
  });

  test("render with positive value and unit", () => {
    renderComponent(10, "%");
    expect(screen.getByText("10%")).toBeInTheDocument();
  });

  test("render with negative value and unit", () => {
    renderComponent(-5, "ms");
    expect(screen.getByText("-5ms")).toBeInTheDocument();
  });
});
