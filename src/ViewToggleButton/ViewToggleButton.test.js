import { render, screen } from "@testing-library/react";

import React from "react";
import ViewToggleButton from ".";

/**
 * Test wrapper for ViewToggleButton
 *
 * Provides state for value to avoid errors changing from uncontrolled to controlled.
 */
const ViewToggleButtonWithState = ({
  onChange,
  value: valueIn = "",
  ...rest
}) => {
  const [value, setValue] = React.useState(valueIn);
  const handleChange = (event, value) => {
    setValue(value);
    onChange && onChange(event, value);
  };
  return <ViewToggleButton {...rest} onChange={handleChange} value={value} />;
};

/**
 * Tests
 */
describe("Select", () => {
  test("can select card view", () => {
    render(<ViewToggleButtonWithState value="card" />);
    const cardButton = screen.getByTestId("cardButton");
    const tableButton = screen.getByTestId("tableButton");
    expect(cardButton.getAttribute("aria-pressed")).toBe("true");
    expect(tableButton.getAttribute("aria-pressed")).toBe("false");
  });
  test("can select table view", () => {
    render(<ViewToggleButtonWithState value="table" />);
    const cardButton = screen.getByTestId("cardButton");
    const tableButton = screen.getByTestId("tableButton");
    expect(cardButton.getAttribute("aria-pressed")).toBe("false");
    expect(tableButton.getAttribute("aria-pressed")).toBe("true");
  });
});
