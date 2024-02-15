import { render, screen, waitFor } from "@testing-library/react";

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
    const user = userEvent.setup();
    const onSubmit = vi.fn(data => data);
    const elements = setup({ onSubmit });
    await user.type(elements.inputs.password, "indigo shark wallplug");
    await user.type(elements.inputs.passwordRepeat, "indigo shark wallplug");
    user.click(elements.submit);
    await waitFor(() =>
      expect(onSubmit).toHaveReturnedWith({
        password: "indigo shark wallplug",
        passwordRepeat: "indigo shark wallplug"
      })
    );
  });
  it("doesnt call callback on validation errors", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const elements = setup({ onSubmit });
    await user.type(elements.inputs.password, "abc123"); // common password
    await user.click(elements.submit);
    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
  });
  describe("Password restrictions", () => {
    it("displays password complexity score", async () => {
      const user = userEvent.setup();
      const elements = setup();
      await user.type(elements.inputs.password, "something");
      await user.click(elements.inputs.passwordRepeat); // moving to next form element triggers validation
      await waitFor(() =>
        expect(
          screen.queryByText("Password strength: 0/4. Minimum required 3+.")
        ).toBeInTheDocument()
      );
    });
    it("doesnt call callback on validation errors", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      const elements = setup({ onSubmit });
      await user.type(elements.inputs.password, "abc123"); // top 100 password
      user.click(elements.submit);
      await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
    });
    it("displays user feedback on password", async () => {
      const user = userEvent.setup();
      const elements = setup();
      await user.type(elements.inputs.password, "something");
      await user.click(elements.inputs.passwordRepeat); // moving to next form element triggers validation
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
