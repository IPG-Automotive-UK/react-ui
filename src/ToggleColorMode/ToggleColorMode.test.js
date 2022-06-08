import { render, screen } from "@testing-library/react";
import React from "react";
import ToggleColorMode from ".";
import fireEvent from "@testing-library/user-event";

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
  test("Brightness7Icon is shown for dark mode", () => {
    render(<ColorModeWithState mode="dark" />);

    // verify dark mode icon is shown
    const darkmode = screen.getByTestId("Brightness7Icon");
    expect(darkmode).toBeInTheDocument();
  });

  test("Brightness4Icon is shown for light mode", () => {
    render(<ColorModeWithState mode="light" />);

    // verify light mode icon is shown
    const lightmode = screen.getByTestId("Brightness4Icon");
    expect(lightmode).toBeInTheDocument();
  });

  test("onClick switch change from light to dark mode", () => {
    const onChange = jest.fn();

    render(<ColorModeWithState onChange={onChange} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(document.querySelector("#sandbox > svg > path"));

    fireEvent.click(button);
    expect(screen.getByTestId("Brightness4Icon"));
  });

  test("onClick switch change from dark to light mode", () => {
    render(<ColorModeWithState mode="dark" />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(screen.getByTestId("Brightness4Icon"));

    fireEvent.click(button);
    expect(document.querySelector("#sandbox > svg > path"));
  });
});
