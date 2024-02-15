import ThemeProvider, { useTheme } from ".";
import { act, render, screen, waitFor } from "@testing-library/react";

import React from "react";
import { userEvent } from "@testing-library/user-event";

/**
 * Test component to render the current theme as text
 */
function ThemeText() {
  const [theme] = useTheme();
  return <p>{theme}</p>;
}

/**
 * Test component to toggle the current theme
 */
function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const onClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <button onClick={onClick}>Toggle</button>
      <ThemeText />
    </>
  );
}

/**
 * Tests
 */
describe("ThemeProvider", () => {
  test("renders children", () => {
    render(
      <ThemeProvider>
        <div data-testid="child">{"I'm a child"}</div>
      </ThemeProvider>
    );
    const child = screen.getByTestId("child");
    expect(child).toBeInTheDocument();
  });
  test("renders light theme by default", () => {
    // render the component
    render(
      <ThemeProvider>
        <ThemeText />
      </ThemeProvider>
    );

    // check that the theme is light
    const text = screen.getByText("light");
    expect(text).toBeInTheDocument();
  });
  test.each(["light", "dark"] as const)(
    "renders %s theme when theme controlled",
    mode => {
      // render the component with the mode we want to test
      render(
        <ThemeProvider theme={mode}>
          <ThemeText />
        </ThemeProvider>
      );

      // check that the theme is the mode we want to test
      const text = screen.getByText(mode);
      expect(text).toBeInTheDocument();
    }
  );
  test.each(["light", "dark"])("renders %s theme from local storage", mode => {
    // set the theme in local storage
    window.localStorage.setItem("theme", mode);

    // render the component
    render(
      <ThemeProvider>
        <ThemeText />
      </ThemeProvider>
    );

    // check that the theme is the mode we want to test
    const text = screen.getByText(mode);
    expect(text).toBeInTheDocument();
  });
  test.each(["light", "dark"])(
    "renders %s theme when theme toggled",
    async mode => {
      // first set the theme to the opposite of the mode we want to test
      window.localStorage.setItem("theme", mode === "light" ? "dark" : "light");

      // render the toggle button
      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );

      // click the toggle button
      const button = screen.getByText("Toggle");
      act(() => {
        userEvent.click(button);
      });

      // check that the theme is now the mode we want to test
      await waitFor(() => {
        // check that the theme is now the mode we want to test
        const text = screen.getByText(mode);
        expect(text).toBeInTheDocument();
      });
    }
  );
});
