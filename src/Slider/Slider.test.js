import { render, screen } from "@testing-library/react";
import React from "react";
import Slider from "./Slider";

/**
 * Tests
 */
describe("Slider", () => {
  test("can render with no props", () => {
    const { container } = render(<Slider />);
    expect(container.firstChild).toBeInTheDocument();
  });
  test("can set the title", () => {
    const title = "This is a test";
    render(<Slider title={title} />);
    expect(screen.getByText(title));
  });
  test("can set min value", () => {
    const minValue = 5;
    const { container } = render(<Slider min={minValue} />);
    const sliderInput = container.querySelector("input");
    expect(Number(sliderInput.min)).toBe(minValue);
  });
  test("can set max value", () => {
    const maxValue = 20;
    const { container } = render(<Slider max={maxValue} />);
    const sliderInput = container.querySelector("input");
    expect(Number(sliderInput.max)).toBe(maxValue);
  });
});
