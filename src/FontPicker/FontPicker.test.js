import FontPicker from ".";
import React from "react";
import { render } from "@testing-library/react";

// list of options to display
const options = ["Arial", "Helvetica", "Times New Roman"];

/**
 * Test wrapper for FontPicker
 *
 * Provides state for value to avoid errors changing from uncontrolled to controlled.
 */
const FontPickerWithState = ({ onChange, value: valueIn = "", ...rest }) => {
  const [value, setValue] = React.useState(valueIn);
  const handleChange = (event, value, reason) => {
    setValue(value);
    onChange && onChange(event, value, reason);
  };
  return <FontPicker {...rest} onChange={handleChange} value={value} />;
};

/**
 * Tests
 */
describe("FontPicker", () => {
  test("can select an item", () => {
    const { container } = render(
      <FontPickerWithState options={options} value="Arial" />
    );
    const inputBase = container.querySelector(".MuiInputBase-input");
    expect(inputBase.value).toBe("Arial");
  });
  test("is item shown in its own font", () => {
    const { container } = render(
      <FontPickerWithState options={options} value="Arial" />
    );
    const inputBase = container.querySelector(".MuiInputBase-input");
    const actualFont = window
      .getComputedStyle(inputBase, null)
      .getPropertyValue("font-family");
    expect(actualFont).toBe("Arial,Arial,sans-serif");
  });
});
