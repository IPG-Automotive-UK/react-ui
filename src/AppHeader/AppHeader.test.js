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
  test("should call onMenuClick when menu button is clicked", () => {
    render(<AppHeader {...defaultInputs} />);
    screen.getByRole("button", { name: "open-menu" }).click();
    expect(defaultInputs.onMenuClick).toHaveBeenCalled();
  });
  test("should display app name", () => {
    render(<AppHeader {...defaultInputs} />);
    screen.getByText(defaultInputs.appName);
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
});
