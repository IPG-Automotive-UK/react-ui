import { render, screen } from "@testing-library/react";

import AppHeader from "./AppHeader";
import React from "react";
import userEvent from "@testing-library/user-event";

// a set of default inputs so that tests can change what theyre testing
const defaultInputs = {
  appName: "App Name",
  onChangePassword: () => {},
  onLogout: jest.fn(),
  onMenuClick: jest.fn(),
  onModeChange: jest.fn(),
  username: "Joe Bloggs"
};

// test app name in the component
describe("AppHeader", () => {
  test("shows first and last initial of username", () => {
    render(<AppHeader {...defaultInputs} username="Ruud van Nistelrooy" />);
    expect(screen.getByText(/RN/i)).toBeInTheDocument();
  });
  test("should show app name", () => {
    render(<AppHeader {...defaultInputs} appName="APP NAME" />);
    expect(screen.getByText(/APP NAME/i)).toBeInTheDocument();
  });
  test("should call onMenuClick when menu button is clicked", async () => {
    const onMenuClick = jest.fn();
    render(<AppHeader {...defaultInputs} onMenuClick={onMenuClick} />);
    const launcherButton = screen.getByTestId("launcher-button");
    await userEvent.click(launcherButton);
    expect(onMenuClick).toHaveBeenCalled();
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
  test("onClick switch change from light to dark mode", async () => {
    const user = userEvent.setup();
    const onModeChange = jest.fn();
    render(
      <AppHeader {...defaultInputs} onModeChange={onModeChange} mode="light" />
    );
    const button = screen.getByRole("checkbox");
    await user.click(button);
    expect(onModeChange).toHaveBeenCalledWith("dark");
  });
  test("onClick switch change from dark to light mode", async () => {
    const user = userEvent.setup();
    const onModeChange = jest.fn();
    render(
      <AppHeader {...defaultInputs} onModeChange={onModeChange} mode="dark" />
    );
    const button = screen.getByRole("checkbox");
    await user.click(button);
    expect(onModeChange).toHaveBeenCalledWith("light");
  });
});
