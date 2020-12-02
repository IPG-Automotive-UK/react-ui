import { act, fireEvent, render, screen } from "@testing-library/react";
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
    const onLogin = jest.fn(data => data);
    const elements = setup({ onLogin });
    await act(async () => {
      userEvent.type(elements.inputs.email, "joe.bloggs@domain.com");
      userEvent.type(elements.inputs.password, "indigo shark wallplug");
      fireEvent.submit(elements.submit);
    });
    expect(onLogin).toHaveReturnedWith({
      email: "joe.bloggs@domain.com",
      password: "indigo shark wallplug"
    });
  });
  it("doesnt call callback on validation errors", async () => {
    const onLogin = jest.fn();
    const elements = setup({ onLogin });
    await act(async () => {
      userEvent.type(elements.inputs.email, "joe.bloggs");
      // missing password
      fireEvent.submit(elements.submit);
    });
    expect(onLogin).not.toHaveBeenCalled();
  });
});
