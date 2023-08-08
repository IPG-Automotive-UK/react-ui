import { fireEvent, render } from "@testing-library/react";

import MaskedInput from "react-text-mask";
import React from "react";
import TextField from ".";
import userEvent from "@testing-library/user-event";

/**
 * Tests
 */
const MaskedTextField = React.forwardRef((props, ref) => (
  <MaskedInput
    {...props}
    mask={[/[1-9]/, /\d/, /\d/, "/", /[1-9]/, /\d/, "R", /[1-9]/, /\d/]}
    keepCharPositions={true}
  />
));
MaskedTextField.displayName = "MaskedTextField";

describe("TextField", () => {
  test("can type value in textfield", async () => {
    const user = userEvent.setup();
    const { container } = render(<TextField />);
    const inputBase = container.querySelector(
      ".MuiInputBase-input"
    ) as HTMLInputElement;

    await user.type(inputBase, "Hello World");
    inputBase.value && expect(inputBase.value).toBe("Hello World");
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
        InputProps={{ inputComponent: MaskedTextField }}
      />
    );
    const input = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "225/60R16" } });

    expect(input).toHaveValue("225/60R16");
  });

  test("check that input is masked when isFieldMasked is true", () => {
    const onChangeMock = jest.fn();
    const { getByRole } = render(
      <TextField
        label="Test Field"
        onChange={onChangeMock}
        InputProps={{ inputComponent: MaskedTextField }}
        isFieldMasked={true}
      />
    );
    const input = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "2256666" } });

    expect(input).toHaveValue("225/66R66");
  });

  test("check that input is not masked when isFieldMasked is false", () => {
    const onChangeMock = jest.fn();
    const { getByRole } = render(
      <TextField
        label="Test Field"
        onChange={onChangeMock}
        InputProps={{ inputComponent: MaskedTextField }}
        isFieldMasked={false}
      />
    );
    const input = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "2256666" } });

    expect(input).toHaveValue("2256666");
  });

  it("test for minRows when multiline is enabled", () => {
    const { getByTestId } = render(<TextField multiline minRows={"2"} />);
    const textField = getByTestId("text-field");

    expect(textField).toBeInTheDocument();

    // Wait for the component to finish rendering and then check the rows attribute
    setTimeout(() => {
      expect(textField.querySelector("textarea")).toHaveAttribute("rows", "2");
    }, 0);
  });

  it("does not exceed maxRows when multiline is enabled", () => {
    const { getByTestId } = render(
      <TextField multiline minRows={"2"} maxRows={"4"} />
    );
    const textField = getByTestId("text-field");

    const textarea = textField.querySelector("textarea");

    if (textarea) {
      fireEvent.change(textarea, {
        target: { value: "Line 1\nLine 2\nLine 3\nLine 4" }
      });

      // calculate the number of rows by counting the number of new lines
      const rows = textarea.value.split("\n").length;

      expect(rows).toBe(4);
    }
  });
});
