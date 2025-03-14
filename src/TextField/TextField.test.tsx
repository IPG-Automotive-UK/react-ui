import { fireEvent, render, screen } from "@testing-library/react";

import MaskedInput from "react-text-mask";
import React from "react";
import TextField from ".";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

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

  test("textfield default value", () => {
    const { getByRole } = render(<TextField defaultValue="uncontrolled" />);
    const input = getByRole("textbox") as HTMLInputElement;

    expect(input).toHaveValue("uncontrolled");
  });

  test("shows error state", () => {
    const { container } = render(<TextField error />);
    const inputBase = container.querySelector(".MuiInputBase-root");
    expect(inputBase).toHaveClass("Mui-error");
  });

  test("renders TextField with masked input component and updates value correctly", () => {
    const onChangeMock = vi.fn();
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
    const onChangeMock = vi.fn();
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
    const onChangeMock = vi.fn();
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

  test("can shrink label when value is present", () => {
    const onChangeMock = vi.fn();
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

    // check data-shrink is true when value is present
    const label = document.querySelector(".MuiInputLabel-root");
    expect(label).toHaveAttribute("data-shrink", "true");
  });

  it("can type multiline text", async () => {
    render(<TextField multiline={true} minRows={2} maxRows={4} />);

    const textarea = screen.getByRole("textbox");

    await userEvent.type(
      textarea,
      `Line 1
Line 2
Line 3
Line 4
Line 5`
    );

    expect(textarea).toHaveValue(`Line 1\nLine 2\nLine 3\nLine 4\nLine 5`);
  });

  it("can use an onBlur callback", async () => {
    const onBlur = vi.fn();

    render(<TextField onBlur={onBlur} />);

    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
