import { render, screen } from "@testing-library/react";
import React from "react";
import ToggleColorMode from ".";
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
    const onChange = jest.fn();

    render(<ColorModeWithState onChange={onChange} mode="light" />);
    const button = screen.getByRole("checkbox");

    await userEvent.click(button);
    expect(onChange).toHaveBeenCalledWith("dark");
  });

  test("onClick switch change from dark to light mode", async () => {
    const onChange = jest.fn();

    render(<ColorModeWithState onChange={onChange} mode="dark" />);
    const button = screen.getByRole("checkbox");

    await userEvent.click(button);
    expect(onChange).toHaveBeenCalledWith("light");
  });
});
