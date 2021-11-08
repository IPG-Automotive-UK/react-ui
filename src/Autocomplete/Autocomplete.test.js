import Autocomplete from ".";
import React from "react";
import { render } from "@testing-library/react";

// list of options to display
const options = [
  "Apple",
  "Banana",
  "Coconut",
  "Date",
  "Elderberry",
  "Fig",
  "Grapefruit",
  "Honeydew melon"
];

/**
 * Test wrapper for Autocomplete
 *
 * Provides state for value to avoid errors changing from uncontrolled to controlled.
 */
const AutocompleteWithState = ({ onChange, value: valueIn = "", ...rest }) => {
  const [value, setValue] = React.useState(valueIn);
  const handleChange = (event, value, reason) => {
    setValue(value);
    onChange && onChange(event, value, reason);
  };
  return <Autocomplete {...rest} onChange={handleChange} value={value} />;
};

/**
 * Tests
 */
describe("Select", () => {
  test("can select an item", () => {
    const { container } = render(
      <AutocompleteWithState options={options} value={options[3]} />
    );
    const value = options[3];
    const inputBase = container.querySelector(".MuiInputBase-input");
    expect(inputBase.value).toBe(value);
  });
  test("shows error state", () => {
    const { container } = render(
      <AutocompleteWithState error options={options} />
    );
    const inputBase = container.querySelector(".MuiInputBase-root");
    expect(inputBase).toHaveClass("Mui-error");
  });
  test("display empty if value is not a valid option", () => {
    const { container } = render(
      <AutocompleteWithState options={options} value="Invalid value" />
    );
    const baseComponent = container.querySelector(".MuiInputBase-input");
    expect(baseComponent.value).toBe("");
  });
});
