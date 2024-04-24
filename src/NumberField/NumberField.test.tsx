import NumberField, { NumberFieldProps } from ".";
import React, { ChangeEvent, useState } from "react";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Test wrapper for Numberfield
 *
 * Provides state for value to avoid errors changing from uncontrolled to controlled
 */
const NumberFieldWithState = ({
  onChange,
  valueIn = 100,
  ...rest
}: {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  valueIn?: number;
} & NumberFieldProps) => {
  const [value, setValue] = useState(valueIn);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
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
    inputBase &&
      (await user.type(inputBase, "{backspace}{backspace}{backspace}"));
    inputBase && (await user.type(inputBase, "123"));
    expect(inputBase).toHaveValue(123);
  });
  test("Numberfield has a default value", () => {
    const { container } = render(<NumberField defaultValue={22} />);

    const input = container.querySelector(".MuiInputBase-input");

    expect(input).toHaveValue(22);
  });
  // This test is not a true reflection of behaviour on all browsers
  // Safari will still allow the user to type in letters
  test("Numberfield does not allow typing of letters", async () => {
    const user = userEvent.setup();
    const { container } = render(<NumberFieldWithState />);
    const inputBase = container.querySelector(".MuiInputBase-input");
    inputBase &&
      (await user.type(inputBase, "{backspace}{backspace}{backspace}"));
    inputBase && (await user.type(inputBase, "abc"));
    expect(inputBase).toHaveValue(0);
  });

  test("shows error state", () => {
    const { container } = render(<NumberFieldWithState error />);
    const inputBase = container.querySelector(".MuiInputBase-root");
    expect(inputBase).toHaveClass("Mui-error");
  });

  test("calls callback", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(<NumberField onChange={onChange} />);
    const inputBase = container.querySelector(".MuiInputBase-input");
    inputBase &&
      (await user.type(inputBase, "{backspace}{backspace}{backspace}"));
    inputBase && (await user.type(inputBase, "10"));
    expect(inputBase).toHaveValue(10);
    expect(onChange).toHaveBeenCalled();
  });
  test("can create component with an initial value of 0", () => {
    const { container } = render(<NumberField value={0} />);

    // the value should be 0
    const inputBase = container.querySelector(".MuiInputBase-input");
    expect(inputBase).toHaveValue(0);
  });
  test("does not show error when value is not an integer and no step has been provided", () => {
    const { container } = render(<NumberFieldWithState value={0.2} />);

    // there should be no helper text (which parents the error message)
    const errorBase = container.querySelector(".MuiFormHelperText-root");
    expect(errorBase).toBe(null);
  });
  test("onChange is called when a value deleted from component and the new value is still valid", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<NumberFieldWithState onChange={onChange} />);
    const inputBase = container.querySelector(".MuiInputBase-input");
    inputBase && (await user.type(inputBase, "{backspace}"));

    // onChange should have been called
    expect(onChange).toHaveBeenCalled();
  });
  test("onChange is called when a value is entered to component with no step set", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<NumberField onChange={onChange} />);
    const inputBase = container.querySelector(".MuiInputBase-input");
    inputBase && (await user.type(inputBase, "1"));

    // onChange should have been called
    expect(onChange).toHaveBeenCalled();
  });
  test("onChange is called when a value is entered to component with step set and value is valid", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <NumberField onChange={onChange} inputProps={{ step: 1 }} />
    );
    const inputBase = container.querySelector(".MuiInputBase-input");
    inputBase && (await user.type(inputBase, "2"));

    // onChange should have been called
    expect(onChange).toHaveBeenCalled();
  });

  test("can use an onBlur callback", async () => {
    const onBlur = vi.fn();
    const { container } = render(<NumberField onBlur={onBlur} />);
    const inputBase = container.querySelector(".MuiInputBase-input");

    inputBase && (await userEvent.click(inputBase));
    await userEvent.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
