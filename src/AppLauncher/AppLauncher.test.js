import { render, screen } from "@testing-library/react";

import AppLauncher from ".";
import React from "react";

/**
 * Tests for AppLauncher component
 */
describe("AppLauncher", () => {
  test("can hide logo", () => {
    render(<AppLauncher showLogo={false} />);
    const logoBox = screen.queryByTestId("logo-box");
    expect(logoBox).not.toBeInTheDocument();
  });
  test("has empty logo link href on default", () => {
    render(<AppLauncher />);
    const logoBox = screen.queryByTestId("virto-logo");
    expect(logoBox).not.toBeInTheDocument();
  });
  test("has a valid logo link href if a string is provided", () => {
    const { container } = render(
      <AppLauncher logoLinkUrl={"https://www.some.url/"} />
    );
    expect(
      container.querySelector("a[href='https://www.some.url/']")
    ).toBeInTheDocument();
  });
});
