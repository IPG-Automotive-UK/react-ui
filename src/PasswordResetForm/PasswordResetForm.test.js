import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PasswordResetForm from "./";
import React from "react";
import userEvent from "@testing-library/user-event";

/**
 * Test setup function that renders component and returns elements for testing
 */
function setup(inputs) {
  render(<PasswordResetForm onSubmit={() => {}} {...inputs} />);
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
describe("PasswordResetForm", () => {
  it("returns form information to callback when successfully validated", async () => {
    const onSubmit = jest.fn(data => data);
    const elements = setup({ onSubmit });
    await userEvent.type(elements.inputs.email, "joe.bloggs@domain.com");
    fireEvent.submit(elements.submit);
    await waitFor(() =>
      expect(onSubmit).toHaveReturnedWith({
        email: "joe.bloggs@domain.com"
      })
    );
  });
  it("shows error message with invalid email", async () => {
    const onSubmit = jest.fn();
    const elements = setup({ onSubmit });
    await userEvent.type(elements.inputs.email, "joe.bloggs"); // incorrect email address format
    fireEvent.submit(elements.submit);
    await waitFor(() =>
      expect(
        screen.queryByText("Please enter a valid email address")
      ).toBeInTheDocument()
    );
  });
  it("displays error message to user on validation fail", async () => {
    const elements = setup();
    await userEvent.type(elements.inputs.email, "joe.bloggs"); // incorrect email address format
    fireEvent.submit(elements.submit);
    await waitFor(() =>
      expect(
        screen.queryByText("Please enter a valid email address")
      ).toBeInTheDocument()
    );
  });
});
