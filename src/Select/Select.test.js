import React from "react";
import Select from "./";
import { render } from "@testing-library/react";
import { selectMaterialUiSelectOption } from "../testUtils";
import userEvent from "@testing-library/user-event";

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
 * Test wrapper for Select
 *
 * Provides state for value to avoid errors changing from uncontrolled to controlled.
 */
const SelectWithState = ({ onChange, value: valueIn = "", ...rest }) => {
  const [value, setValue] = React.useState(valueIn);
  const handleChange = event => {
    setValue(event.target.value);
    onChange && onChange(event);
  };
  return <Select {...rest} onChange={handleChange} value={value} />;
};

/**
 * Tests
 */
describe("Select", () => {
  test("can select an item", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn(event => event.target.value);
    const { container } = render(
      <SelectWithState options={options} onChange={onChange} />
    );
    const value = options[3];
    await selectMaterialUiSelectOption(container, value, user);
    expect(onChange).toHaveReturnedWith(value);
  });
  test("shows error state", () => {
    const { container } = render(<SelectWithState error options={options} />);
    const inputBase = container.querySelector(".MuiInputBase-root");
    expect(inputBase).toHaveClass("Mui-error");
  });
  test("display empty if value is not a valid option", () => {
    const { container } = render(
      <SelectWithState options={options} value="Invalid value" />
    );
    const baseComponent = container.querySelector(".MuiSelect-nativeInput");
    expect(baseComponent.value).toBe("");
  });
  test("display the value if it's a valid option", () => {
    const { container } = render(
      <SelectWithState options={options} value="Apple" />
    );
    const baseComponent = container.querySelector(".MuiSelect-nativeInput");
    expect(baseComponent.value).toBe("Apple");
  });
});
