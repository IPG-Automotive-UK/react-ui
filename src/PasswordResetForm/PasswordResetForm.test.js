import React from "react";
import PasswordResetForm from "./";
import { render, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { selectMaterialUiSelectOption } from "../testUtils";

/**
 * Test setup function that renders component and returns elements for testing
 */
function setup(inputs) {
  render(<PasswordResetForm onReset={() => {}} {...inputs} />);
  return {
    inputs: {
      password: screen.getByLabelText("password"),
      passwordRepeat: screen.getByLabelText("passwordRepeat")
    },
    submit: screen.getByRole("button", {
      name: /Update password/i
    })
  };
}

/**
 * Tests
 */
describe("PasswordResetForm", () => {
  it("returns form information to callback when successfully validated", async () => {
    const onReset = jest.fn(data => data);
    const elements = setup({ onReset });
    await act(async () => {
      await userEvent.type(elements.inputs.password, "indigo shark wallplug");
      await userEvent.type(
        elements.inputs.passwordRepeat,
        "indigo shark wallplug"
      );
      fireEvent.submit(elements.submit);
    });
    expect(onReset).toHaveReturnedWith({
      password: "indigo shark wallplug",
      passwordRepeat: "indigo shark wallplug"
    });
  });
  it("doesnt call callback on validation errors", async () => {
    const onReset = jest.fn();
    const elements = setup({ onReset });
    await act(async () => {
      await userEvent.type(elements.inputs.password, "abc123"); // common password
      fireEvent.submit(elements.submit);
    });
    expect(onReset).not.toHaveBeenCalled();
  });
  describe("Password restrictions", () => {
    it("displays password complexity score", async () => {
      const elements = setup();
      await act(async () => {
        await userEvent.type(elements.inputs.password, "something");
      });
      expect(
        screen.findByText("Password strength: 0/4. Minimum required 3+.")
      ).toBeTruthy();
    });
    it("displays user feedback on password", async () => {
      const elements = setup();
      await act(async () => {
        await userEvent.type(elements.inputs.password, "something");
      });
      expect(
        screen.findByText("Add another word or two. Uncommon words are better.")
      ).toBeTruthy();
    });
  });
});
