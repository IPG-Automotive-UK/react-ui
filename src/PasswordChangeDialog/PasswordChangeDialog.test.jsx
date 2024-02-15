import { render, screen, waitFor } from "@testing-library/react";

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
      onClose={vi.fn()}
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
    const user = userEvent.setup();
    const onSubmit = vi.fn(data => data);
    const elements = setup({ onSubmit });
    await user.type(elements.inputs.currentPassword, "abc123");
    await user.type(elements.inputs.newPassword, "coffee podium dvdplayer");
    await user.type(
      elements.inputs.newPasswordRepeat,
      "coffee podium dvdplayer"
    );
    user.click(elements.submit);
    await waitFor(() =>
      expect(onSubmit).toHaveReturnedWith({
        currentPassword: "abc123",
        newPassword: "coffee podium dvdplayer",
        newPasswordRepeat: "coffee podium dvdplayer"
      })
    );
  });
  it("doesnt call callback on validation errors", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const elements = setup({ onSubmit });
    await user.type(elements.inputs.newPassword, "abc123"); // top 100 password))
    user.click(elements.submit);
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0));
  });
  it("displays error message to user on validation fail", async () => {
    const user = userEvent.setup();
    const elements = setup();
    await user.type(elements.inputs.newPassword, "abc123"); // top 100 password
    user.click(elements.submit);
    await waitFor(() => {
      expect(
        screen.queryByText("This is a top-100 common password")
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Password strength: 0/4. Minimum required 3+.")
      ).toBeInTheDocument();
    });
  });
});
