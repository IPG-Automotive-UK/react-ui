import NumberField from ".";
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Test wrapper for Numberfield
 *
 * Provides state for value to avoid errors changing from uncontrolled to controlled
 */
const NumberFieldWithState = ({ onChange, valueIn = 100, ...rest }) => {
  const [value, setValue] = React.useState(valueIn);
  const handleChange = event => {
    setValue(event.target.value);
    onChange && onChange(event);
  };
  return <NumberField {...rest} onChange={handleChange} value={value} />;
};

/**
 * Tests
 */
describe("NumberField", () => {
  test("can type value in Numberfield", async () => {
    const user = userEvent.setup();
    const { container } = render(<NumberFieldWithState />);
    const inputBase = container.querySelector(".MuiInputBase-input");
    await user.type(inputBase, "{backspace}{backspace}{backspace}");
    await user.type(inputBase, "123");
    expect(inputBase.value).toBe("123");
  });
  test("Numberfield does not allow typing of letters", async () => {
    const user = userEvent.setup();
    const { container } = render(<NumberFieldWithState />);
    const inputBase = container.querySelector(".MuiInputBase-input");
    await user.type(inputBase, "{backspace}{backspace}{backspace}");
    await user.type(inputBase, "abc");
    expect(inputBase.value).toBe("");
  });
  test("shows error state", () => {
    const { container } = render(<NumberFieldWithState error />);
    const inputBase = container.querySelector(".MuiInputBase-root");
    expect(inputBase).toHaveClass("Mui-error");
  });
  test("shows error when value exceeds max", async () => {
    const user = userEvent.setup();
    const { container } = render(<NumberFieldWithState max={123} />);
    const inputBase = container.querySelector(".MuiInputBase-input");
    await user.type(inputBase, "{backspace}{backspace}{backspace}");
    await user.type(inputBase, "1234");
    // expect(inputBase.value).toBe("1234");
    const errorBase = container.querySelector(".MuiInputBase-root");
    expect(errorBase).toHaveClass("Mui-error");
  });
  test("shows error when value is less than min", async () => {
    const user = userEvent.setup();
    const { container } = render(<NumberFieldWithState min={1234} />);
    const inputBase = container.querySelector(".MuiInputBase-input");
    await user.type(inputBase, "{backspace}{backspace}{backspace}");
    await user.type(inputBase, "123");
    expect(inputBase.value).toBe("123");
    const errorBase = container.querySelector(".MuiInputBase-root");
    expect(errorBase).toHaveClass("Mui-error");
  });
  test("shows error when value is not a multiple of step", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <NumberFieldWithState min={0} max={100} step={10} />
    );
    const inputBase = container.querySelector(".MuiInputBase-input");
    await user.type(inputBase, "{backspace}{backspace}{backspace}");
    await user.type(inputBase, "5");
    expect(inputBase.value).toBe("5");
    const errorBase = container.querySelector(".MuiFormHelperText-root");
    expect(errorBase).toHaveClass("Mui-error");
    expect(errorBase.textContent).toBe(
      "Please enter a valid value. The nearest valid values are 0 and 10."
    );
  });
  test("does not show error when value is valid", async () => {
    const user = userEvent.setup();
    const { container } = render(<NumberFieldWithState min={123} max={1234} />);
    const inputBase = container.querySelector(".MuiInputBase-input");
    await user.type(inputBase, "{backspace}{backspace}{backspace}");
    await user.type(inputBase, "124");
    expect(inputBase.value).toBe("124");
    const errorBase = container.querySelector(".MuiInputBase-root");
    expect(errorBase).not.toHaveClass("Mui-error");
  });
  test("does not call callback when value is not valid", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { container } = render(
      <NumberField min={0} max={100} step={10} onChange={onChange} />
    );
    const inputBase = container.querySelector(".MuiInputBase-input");
    await user.type(inputBase, "{backspace}{backspace}{backspace}");
    await user.type(inputBase, "5");
    expect(inputBase.value).toBe("5");
    expect(onChange).not.toHaveBeenCalled();
  });
  test("calls callback when value is valid", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { container } = render(
      <NumberField min={0} max={100} step={10} onChange={onChange} />
    );
    const inputBase = container.querySelector(".MuiInputBase-input");
    await user.type(inputBase, "{backspace}{backspace}{backspace}");
    await user.type(inputBase, "10");
    expect(inputBase.value).toBe("10");
    expect(onChange).toHaveBeenCalled();
  });
  test("can create component with an initial value of 0", async () => {
    const { container } = render(
      <NumberField min={0} max={100} step={10} value={0} />
    );
    const inputBase = container.querySelector(".MuiInputBase-input");
    expect(inputBase.value).toBe("0");
  });
  test("does not show error when value is not an integer and no step has been provided", async () => {
    const { container } = render(
      <NumberFieldWithState min={0} max={100} value={0.2} />
    );

    const errorBase = container.querySelector(".MuiFormHelperText-root");
    expect(errorBase).toBe(null);
  });
});
