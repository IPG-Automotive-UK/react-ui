import { render, screen } from "@testing-library/react";

import AppHeader from ".";
import React from "react";
import userEvent from "@testing-library/user-event";

// a set of default inputs so that tests can change what theyre testing
const defaultInputs = {
  appName: "App Name",
  onAppClick: jest.fn(),
  onChangePassword: () => {},
  onColourModeChange: jest.fn(),
  onLogout: jest.fn(),
  username: "Joe Bloggs"
};

// tests for the app header component
describe("AppHeader", () => {
  test("shows first and last initial of username", () => {
    render(<AppHeader {...defaultInputs} username="Ruud van Nistelrooy" />);
    expect(screen.getByText(/RN/i)).toBeInTheDocument();
  });
  test("should show app name", () => {
    render(<AppHeader {...defaultInputs} appName="APP NAME" />);
    expect(screen.getByText(/APP NAME/i)).toBeInTheDocument();
  });

  test("should call onChangePassword when password button is clicked", async () => {
    const user = userEvent.setup();
    const onChangePassword = jest.fn();
    render(
      <AppHeader {...defaultInputs} onChangePassword={onChangePassword} />
    );
    await user.click(screen.getByRole("button", { name: /JB/i }));
    await user.click(
      screen.getByRole("menuitem", { name: /Change password/i })
    );
    expect(onChangePassword).toHaveBeenCalled();
  });
  test("onLogout called on user click", async () => {
    const user = userEvent.setup();
    const onLogout = jest.fn();
    render(<AppHeader {...defaultInputs} onLogout={onLogout} />);
    await user.click(screen.getByRole("button", { name: /JB/i }));
    await user.click(screen.getByRole("menuitem", { name: /Logout/i }));
    expect(onLogout).toHaveBeenCalled();
  });
  test("children are rendered", () => {
    render(
      <AppHeader {...defaultInputs}>
        <div>Child</div>
      </AppHeader>
    );
    expect(screen.getByText(/Child/i)).toBeInTheDocument();
  });
});
