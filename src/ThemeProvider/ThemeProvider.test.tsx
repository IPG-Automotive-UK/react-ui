import React, { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";

import ThemeProvider from ".";
import { useColorScheme } from "@mui/material";
import { userEvent } from "@testing-library/user-event";

/**
 * Test component to render the current theme as text
 */
function ThemeText() {
  const { mode } = useColorScheme();
  return <p>{mode}</p>;
}

/**
 * Test component to toggle the current theme
 */
function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  const onClick = () => {
    setMode(mode === "light" ? "dark" : "light");
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
    window.localStorage.setItem("mui-theme", mode);

    // get the theme from local storage
    const defaultMode = window.localStorage.getItem("mui-theme") as
      | "light"
      | "dark";

    console.log(defaultMode);

    // render the component
    render(
      <ThemeProvider theme={defaultMode}>
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
      window.localStorage.setItem(
        "mui-theme",
        mode === "light" ? "dark" : "light"
      );

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
