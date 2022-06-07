import { render, screen } from "@testing-library/react";
import React from "react";
import ToggleColorMode from ".";

describe("ToggleColorMode", () => {
  test("Brightness7Icon is shown for dark mode", () => {
    render(<ToggleColorMode mode="light" />);

    // verify dark mode icon is shown
    const darkmode = screen.getByTestId("Brightness7Icon");
    // expect(leftButton.getAttribute("aria-pressed")).toBe("true");
  });
});
