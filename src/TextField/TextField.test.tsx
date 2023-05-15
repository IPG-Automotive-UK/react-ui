import { fireEvent, render } from "@testing-library/react";

import MaskedInput from "react-text-mask";
import React from "react";
import TextField from ".";

/**
 * Tests
 */

const TextFieldMask = React.forwardRef((props, ref) => (
  <MaskedInput
    {...props}
    mask={[/[1-9]/, /\d/, /\d/, "/", /[1-9]/, /\d/, "R", /[1-9]/, /\d/]}
    keepCharPositions={true}
  />
));
TextFieldMask.displayName = "TextFieldMask";

describe("TextField", () => {
  test("allows the user to type a value", () => {
    const onChangeMock = jest.fn();
    const { getByRole } = render(
      <TextField label="Test Field" onChange={onChangeMock} />
    );
    const input = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Test Value" } });

    if (input != null) {
      expect(input.value).toBe("Test Value");
    }
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  test("shows error state", () => {
    const { container } = render(<TextField error />);
    const inputBase = container.querySelector(".MuiInputBase-root");
    expect(inputBase).toHaveClass("Mui-error");
  });

  test("renders TextField with masked input component and updates value correctly", () => {
    const onChangeMock = jest.fn();
    const { getByRole } = render(
      <TextField
        label="Test Field"
        onChange={onChangeMock}
        InputProps={{ inputComponent: TextFieldMask }}
      />
    );
    const input = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "225/60R16" } });

    expect(input).toHaveValue("225/60R16");
  });
});
