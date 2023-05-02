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
  test("renders black by default", () => {
    const { container } = render(<IpgLogo />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#1D1D1B");
  });
  test("renders black IPG Logo", () => {
    const { container } = render(<IpgLogo textColour="black" />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#1D1D1B");
  });
  test("renders white IPG logo", () => {
    const { container } = render(<IpgLogo textColour="white" />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "white");
  });
});
