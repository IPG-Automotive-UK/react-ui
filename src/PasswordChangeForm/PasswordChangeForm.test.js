import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import PasswordChangeForm from "./";
import React from "react";
import userEvent from "@testing-library/user-event";

/**
 * Test setup function that renders component and returns elements for testing
 */
function setup(inputs) {
  render(<PasswordChangeForm onSubmit={() => {}} {...inputs} />);
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
describe("PasswordChangeForm", () => {
  it("returns form information to callback when successfully validated", async () => {
    const onSubmit = jest.fn(data => data);
    const elements = setup({ onSubmit });
    await userEvent.type(elements.inputs.password, "indigo shark wallplug");
    await userEvent.type(
      elements.inputs.passwordRepeat,
      "indigo shark wallplug"
    );
    fireEvent.submit(elements.submit);
    await waitFor(() =>
      expect(onSubmit).toHaveReturnedWith({
        password: "indigo shark wallplug",
        passwordRepeat: "indigo shark wallplug"
      })
    );
  });
  it("doesnt call callback on validation errors", async () => {
    const onSubmit = jest.fn();
    const elements = setup({ onSubmit });
    act(() => {
      userEvent.type(elements.inputs.password, "abc123"); // common password
    });
    fireEvent.submit(elements.submit);
    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
  });
  describe("Password restrictions", () => {
    it("displays password complexity score", async () => {
      const elements = setup();
      act(() => {
        userEvent.type(elements.inputs.password, "something");
        userEvent.click(elements.inputs.passwordRepeat); // moving to next form element triggers validation
      });
      await waitFor(() =>
        expect(
          screen.queryByText("Password strength: 0/4. Minimum required 3+.")
        ).toBeInTheDocument()
      );
    });
    it("doesnt call callback on validation errors", async () => {
      const onSubmit = jest.fn();
      const elements = setup({ onSubmit });
      act(() => {
        userEvent.type(elements.inputs.password, "abc123"); // top 100 password
      });
      fireEvent.submit(elements.submit);
      await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
    });
    it("displays user feedback on password", async () => {
      const elements = setup();
      act(() => {
        userEvent.type(elements.inputs.password, "something");
        userEvent.click(elements.inputs.passwordRepeat); // moving to next form element triggers validation
      });
      await waitFor(() =>
        expect(
          screen.queryByText(
            "Add another word or two. Uncommon words are better."
          )
        ).toBeInTheDocument()
      );
    });
  });
});
