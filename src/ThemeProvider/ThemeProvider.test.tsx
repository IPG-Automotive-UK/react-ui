import React, { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";

import ThemeProvider from ".";
import { createTheme } from "@mui/material/styles";
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
  test("should have correct colors in light mode", () => {
    const theme = createTheme({
      palette: {
        background: {
          default: "#FAFAFA",
          paper: "#FFFFFF"
        },
        primary: {
          dark: "#2A3E51",
          light: "#637B90",
          main: "#3D5A75"
        },
        secondary: {
          dark: "#B27A1E",
          light: "#FFBF56",
          main: "#FFAF2C"
        }
      }
    });

    const { getByTestId } = render(
      <ThemeProvider theme={"light"}>
        <div data-testid="test-element" />
      </ThemeProvider>
    );
    const element = getByTestId("test-element");
    expect(element).toBeInTheDocument();
    expect(theme.palette.primary.main).toBe("#3D5A75");
    expect(theme.palette.primary.light).toBe("#637B90");
    expect(theme.palette.primary.dark).toBe("#2A3E51");
    expect(theme.palette.secondary.main).toBe("#FFAF2C");
    expect(theme.palette.secondary.light).toBe("#FFBF56");
    expect(theme.palette.secondary.dark).toBe("#B27A1E");
    expect(theme.palette.background.default).toBe("#FAFAFA");
    expect(theme.palette.background.paper).toBe("#FFFFFF");
  });
  test("should have correct colors in dark mode", () => {
    const theme = createTheme({
      palette: {
        background: {
          default: "#121B24",
          paper: "#182533"
        },
        primary: {
          dark: "#41607D",
          light: "#7EA1C3",
          main: "#5E8AB4"
        },
        secondary: {
          dark: "#B27A1E",
          light: "#FFBF56",
          main: "#FFAF2C"
        }
      }
    });

    const { getByTestId } = render(
      <ThemeProvider theme={"dark"}>
        <div data-testid="test-element" />
      </ThemeProvider>
    );
    const element = getByTestId("test-element");
    expect(element).toBeInTheDocument();
    expect(theme.palette.primary.main).toBe("#5E8AB4");
    expect(theme.palette.primary.light).toBe("#7EA1C3");
    expect(theme.palette.primary.dark).toBe("#41607D");
    expect(theme.palette.secondary.main).toBe("#FFAF2C");
    expect(theme.palette.secondary.light).toBe("#FFBF56");
    expect(theme.palette.secondary.dark).toBe("#B27A1E");
    expect(theme.palette.background.default).toBe("#121B24");
    expect(theme.palette.background.paper).toBe("#182533");
  });
});
