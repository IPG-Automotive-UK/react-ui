import { render, screen, waitFor } from "@testing-library/react";

import LoginForm from "./";
import React from "react";
import userEvent from "@testing-library/user-event";

/**
 * Test setup function that renders component and returns elements for testing
 */
function setup(inputs) {
  render(<LoginForm onLogin={() => {}} {...inputs} />);
  return {
    inputs: {
      email: screen.getByLabelText("email"),
      password: screen.getByLabelText("password")
    },
    submit: screen.getByRole("button", { name: /login/i })
  };
}

/**
 * Tests
 */
describe("LoginForm", () => {
  it("returns form information to callback when successfully validated", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn(data => data);
    const elements = setup({ onLogin });
    await user.type(elements.inputs.email, "joe.bloggs@domain.com");
    await user.type(elements.inputs.password, "indigo shark wallplug");
    user.click(elements.submit);
    await waitFor(() =>
      expect(onLogin).toHaveReturnedWith({
        email: "joe.bloggs@domain.com",
        password: "indigo shark wallplug"
      })
    );
  });
  it("doesnt call callback on validation errors", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn();
    const elements = setup({ onLogin });
    await user.type(elements.inputs.email, "joe.bloggs"); // incorrect email address format
    user.click(elements.submit);
    await waitFor(() => expect(onLogin).not.toHaveBeenCalled());
  });
  it("displays error message to user on validation fail", async () => {
    const user = userEvent.setup();
    const elements = setup();
    await user.type(elements.inputs.email, "joe.bloggs"); // incorrect email address format
    user.click(elements.submit);
    await waitFor(() =>
      expect(
        screen.queryByText("Please enter a valid email address")
      ).toBeInTheDocument()
    );
  });
});
