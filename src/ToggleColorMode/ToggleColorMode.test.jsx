import { render, screen } from "@testing-library/react";

import React from "react";
import ThemeProvider from "../ThemeProvider/ThemeProvider";
import ToggleColorMode from ".";
import useTheme from "../ThemeProvider/useTheme";
import userEvent from "@testing-library/user-event";

/**
 * Test wrapper for SwitchMode
 * Provides state for the mode
 */
const ColorModeWithState = ({ onChange, mode: modeIn = "light", ...rest }) => {
  const [mode, setMode] = React.useState(modeIn);
  const handleChange = mode => {
    setMode(mode);
    onChange && onChange(mode);
  };
  return <ToggleColorMode {...rest} onChange={handleChange} mode={mode} />;
};

/**
 * Test wrapper for integration with ThemeProvider
 */
const ToggleWithContext = props => {
  const [theme, setTheme] = useTheme();
  return <ToggleColorMode {...props} mode={theme} onChange={setTheme} />;
};

describe("ToggleColorMode", () => {
  test("In light mode switch is unchecked", () => {
    render(<ColorModeWithState mode="light" />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.checked).toBeFalsy();
  });

  test("In dark mode switch is checked", () => {
    render(<ColorModeWithState mode="dark" />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.checked).toBeTruthy();
  });

  test("onClick switch change from light to dark mode", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<ColorModeWithState onChange={onChange} mode="light" />);
    const button = screen.getByRole("checkbox");

    await user.click(button);
    expect(onChange).toHaveBeenCalledWith("dark");
  });

  test("onClick switch change from dark to light mode", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<ColorModeWithState onChange={onChange} mode="dark" />);
    const button = screen.getByRole("checkbox");

    await user.click(button);
    expect(onChange).toHaveBeenCalledWith("light");
  });

  describe("integration with ThemeProvider", () => {
    test("Can switch from light to dark mode", async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider mode="light">
          <ToggleWithContext />
        </ThemeProvider>
      );
      const button = screen.getByRole("checkbox");

      await user.click(button);

      expect(screen.getByRole("checkbox").checked).toBeTruthy();
    });
    test("Can switch from dark to light mode", async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider theme="dark">
          <ToggleWithContext />
        </ThemeProvider>
      );
      const button = screen.getByRole("checkbox");

      await user.click(button);

      expect(screen.getByRole("checkbox").checked).toBeFalsy();
    });
  });
});
