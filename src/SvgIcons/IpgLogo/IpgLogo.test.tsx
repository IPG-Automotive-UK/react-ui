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
});
