import NumberField from ".";
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Tests
 */
describe("NumberField", () => {
  test("can type value in Numberfield", () => {
    const { container } = render(<NumberField />);
    const inputBase = container.querySelector(".MuiInputBase-input");
    userEvent.type(inputBase, "123");
    expect(inputBase.value).toBe("123");
  });
  test("Numberfield does not allow typing of letters", () => {
    const { container } = render(<NumberField />);
    const inputBase = container.querySelector(".MuiInputBase-input");
    userEvent.type(inputBase, "abc");
    expect(inputBase.value).toBe("");
  });
  test("shows error state", () => {
    const { container } = render(<NumberField error />);
    const inputBase = container.querySelector(".MuiInputBase-root");
    expect(inputBase).toHaveClass("Mui-error");
  });
});
