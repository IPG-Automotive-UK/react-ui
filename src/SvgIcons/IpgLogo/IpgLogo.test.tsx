import * as React from "react";

import IpgLogo from ".";
import { render } from "@testing-library/react";

/**
 * Tests
 */
describe("IpgLogo", () => {
  test("renders", () => {
    const { container } = render(<IpgLogo />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
  test("renders light mode by default", () => {
    const { container } = render(<IpgLogo />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#1D1D1B");
  });
  test("renders light mode light when mode is overidden ", () => {
    const { container } = render(<IpgLogo mode="light" />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#1D1D1B");
  });
  test("renders dark mode when mode is overidden ", () => {
    const { container } = render(<IpgLogo mode="dark" />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "white");
  });
});
