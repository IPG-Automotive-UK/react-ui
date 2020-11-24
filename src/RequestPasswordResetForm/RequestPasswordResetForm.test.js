import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import RequestPasswordResetForm from "./";
import userEvent from "@testing-library/user-event";

/**
 * Test setup function that renders component and returns elements for testing
 */
function setup(inputs) {
  render(<RequestPasswordResetForm onSubmit={() => {}} {...inputs} />);
  return {
    inputs: {
      email: screen.getByLabelText("email")
    },
    submit: screen.getByRole("button", { name: /Reset password/i })
  };
}

/**
 * Tests
 */
describe("RequestPasswordResetForm", () => {
  it("returns form information to callback when successfully validated", async () => {
    const onSubmit = jest.fn(data => data);
    const elements = setup({ onSubmit });
    await act(async () => {
      userEvent.type(elements.inputs.email, "joe.bloggs@domain.com");
      fireEvent.submit(elements.submit);
    });
    expect(onSubmit).toHaveReturnedWith({
      email: "joe.bloggs@domain.com"
    });
  });
  it("doesnt call callback on validation errors", async () => {
    const onSubmit = jest.fn();
    const elements = setup({ onSubmit });
    await act(async () => {
      userEvent.type(elements.inputs.email, "joe.bloggs"); // invalid email
      fireEvent.submit(elements.submit);
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
