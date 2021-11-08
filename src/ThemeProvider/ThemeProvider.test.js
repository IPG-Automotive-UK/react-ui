import { render, screen } from "@testing-library/react";
import React from "react";
import ThemeProvider from "./";

/**
 * Tests
 */
describe("ThemeProvider", () => {
  test("renders children", () => {
    render(
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <div data-testid="child">I'm a child</div>
        </ThemeProvider>
      </StyledEngineProvider>
    );
    const child = screen.getByTestId("child");
    expect(child).toBeInTheDocument();
  });
});
