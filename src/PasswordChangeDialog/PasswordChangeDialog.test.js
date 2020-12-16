import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PasswordChangeDialog from "./";
import React from "react";
import userEvent from "@testing-library/user-event";

/**
 * Test setup function that renders component and returns elements for testing
 */
function setup(inputs) {
  render(
    <PasswordChangeDialog
      open
      onClose={jest.fn()}
      onSubmit={() => {}}
      status="init"
      {...inputs}
    />
  );
  return {
    inputs: {
      currentPassword: screen.getByLabelText("currentPassword"),
      newPassword: screen.getByLabelText("newPassword"),
      newPasswordRepeat: screen.getByLabelText("newPasswordRepeat")
    },
    submit: screen.getByRole("button", { name: /Change password/i })
  };
}

/**
 * Tests
 */
describe("PasswordChangeDialog", () => {
  it("returns form information to callback when successfully validated", async () => {
    const onSubmit = jest.fn(data => data);
    const elements = setup({ onSubmit });
    userEvent.type(elements.inputs.currentPassword, "abc123");
    userEvent.type(elements.inputs.newPassword, "coffee podium dvdplayer");
    userEvent.type(
      elements.inputs.newPasswordRepeat,
      "coffee podium dvdplayer"
    );
    fireEvent.submit(elements.submit);
    await waitFor(() =>
      expect(onSubmit).toHaveReturnedWith({
        currentPassword: "abc123",
        newPassword: "coffee podium dvdplayer",
        newPasswordRepeat: "coffee podium dvdplayer"
      })
    );
  });
  it("doesnt call callback on validation errors", async () => {
    const onSubmit = jest.fn();
    const elements = setup({ onSubmit });
    userEvent.type(elements.inputs.newPassword, "abc123"); // top 100 password
    fireEvent.submit(elements.submit);
    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
  });
});
