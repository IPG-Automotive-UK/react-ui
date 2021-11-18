import React from "react";
import TextField from ".";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Tests
 */
describe("TextField", () => {
  test("can type value in textfield", () => {
    const { container } = render(<TextField />);
    const inputBase = container.querySelector(".MuiInputBase-input");
    userEvent.type(inputBase, "Hello World");
    expect(inputBase.value).toBe("Hello World");
  });
  test("shows error state", () => {
    const { container } = render(<TextField error />);
    const inputBase = container.querySelector(".MuiInputBase-root");
    expect(inputBase).toHaveClass("Mui-error");
  });
});
