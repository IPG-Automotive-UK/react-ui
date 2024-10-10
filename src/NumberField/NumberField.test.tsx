import NumberField, { NumberFieldProps } from ".";
import React, { useState } from "react";

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
  onChange?: (value: number) => void;
  valueIn?: number | null;
} & NumberFieldProps) => {
  const [value, setValue] = useState(valueIn);

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
  test("can have null as a value", () => {
    const { getByLabelText } = render(
      <NumberFieldWithState label="NumberField" valueIn={null} />
    );
    const input = getByLabelText("NumberField") as HTMLInputElement;
    expect(input.value).toBe("");
  });
  test("can type value in Numberfield", async () => {
    const user = userEvent.setup();
    const { container } = render(<NumberFieldWithState />);
    const inputBase = container.querySelector(
      ".MuiInputBase-input"
    ) as HTMLInputElement;
    await user.type(inputBase, "{backspace}{backspace}{backspace}");
    await user.type(inputBase, "123");
    expect(inputBase.value).toBe("123");
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
    const inputBase = container.querySelector(
      ".MuiInputBase-input"
    ) as HTMLInputElement;
    await user.type(inputBase, "{backspace}{backspace}{backspace}");
    await user.type(inputBase, "abc");
    expect(inputBase).toHaveValue(null);
  });

  test("shows error state", () => {
    const { container } = render(<NumberFieldWithState error />);
    const inputBase = container.querySelector(".MuiInputBase-root");
    expect(inputBase).toHaveClass("Mui-error");
  });

  test("shows error when value exceeds max", async () => {
    const user = userEvent.setup();
    const { container } = render(<NumberFieldWithState max={123} />);
    const inputBase = container.querySelector(
      ".MuiInputBase-input"
    ) as HTMLInputElement;
    await user.type(inputBase, "{backspace}{backspace}{backspace}");
    await user.type(inputBase, "1234");
    const errorBase = container.querySelector(".MuiInputBase-root");
    expect(errorBase).toHaveClass("Mui-error");
  });

  test("shows error when value is less than min", async () => {
    const user = userEvent.setup();
    const { container } = render(<NumberFieldWithState min={1234} />);
    const inputBase = container.querySelector(
      ".MuiInputBase-input"
    ) as HTMLInputElement;
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
    const inputBase = container.querySelector(
      ".MuiInputBase-input"
    ) as HTMLInputElement;
    await user.type(inputBase, "{backspace}{backspace}{backspace}");
    await user.type(inputBase, "5");
    expect(inputBase.value).toBe("5");
    const errorBase = container.querySelector(
      ".MuiFormHelperText-root"
    ) as HTMLElement;
    expect(errorBase).toHaveClass("Mui-error");
    expect(errorBase.textContent).toBe(
      "Must be a multiple of 10. Try 0 or 10."
    );
  });

  test("calls callback when value is valid", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <NumberField min={0} max={100} step={10} onChange={onChange} />
    );
    const inputBase = container.querySelector(
      ".MuiInputBase-input"
    ) as HTMLInputElement;
    await user.type(inputBase, "{backspace}{backspace}{backspace}");
    await user.type(inputBase, "10");
    expect(inputBase.value).toBe("10");
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

  test("onChange is not called when a value is entered to a component with step set and value is invalid", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<NumberField onChange={onChange} step={10} />);
    const inputBase = container.querySelector(
      ".MuiInputBase-input"
    ) as HTMLInputElement;
    await user.type(inputBase, "1");

    // onChange should not be called
    expect(onChange).not.toHaveBeenCalled();
  });

  test("onChange is not called when a value is entered to a component with a min value set and entered value is invalid", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<NumberField onChange={onChange} min={10} />);
    const inputBase = container.querySelector(
      ".MuiInputBase-input"
    ) as HTMLInputElement;
    await user.type(inputBase, "2");

    // onChange should have been called
    expect(onChange).not.toHaveBeenCalled();
  });
  test("can handle floating point math", async () => {
    const user = userEvent.setup();
    const { container } = render(<NumberFieldWithState step={0.2} />);
    const inputBase = container.querySelector(
      ".MuiInputBase-input"
    ) as HTMLInputElement;
    await user.type(inputBase, "{backspace}{backspace}{backspace}");
    await user.type(inputBase, "0.6");
    expect(inputBase.value).toBe("0.6");

    // there should be no helper text (which parents the error message)
    const errorBase = container.querySelector(".MuiFormHelperText-root");
    expect(errorBase).toBe(null);
  });

  test("can use an onBlur callback", async () => {
    const onBlur = vi.fn();
    const { container } = render(<NumberField onBlur={onBlur} />);
    const inputBase = container.querySelector(".MuiInputBase-input");

    inputBase && (await userEvent.click(inputBase));
    await userEvent.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test("renders a start adornment", () => {
    const { container } = render(<NumberField startAdornment="£" />);
    const startAdornment = container.querySelector(
      ".MuiInputAdornment-positionStart"
    );
    // There should be a start adornment with the text £
    expect(startAdornment).toHaveTextContent("£");
  });

  test("renders a start adornment", () => {
    const { container } = render(<NumberField endAdornment="kg" />);
    const endAdornment = container.querySelector(
      ".MuiInputAdornment-positionEnd"
    );
    // There should be a start adornment with the text kg
    expect(endAdornment).toHaveTextContent("kg");
  });
});
