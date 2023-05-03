import { render, screen } from "@testing-library/react";

import AppHeader from ".";
import React from "react";
import VirtoLogo from "../SvgIcons/VirtoLogo";
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
  test("can render app logo", () => {
    const { container } = render(
      <AppHeader {...defaultInputs} appLogo={<VirtoLogo />} />
    );

    // expect container to exist
    expect(container).toBeInTheDocument();

    // find a specific path in the svg with the virto logo and check it exists
    const virtoLogoPath = container.querySelector(
      'path[d="M124.58 0H93.2086C92.5382 0.00459184 92.0928 0.707143 92.3775 1.31327L94.88 6.68112C95.0316 7.00255 95.3576 7.21378 95.7112 7.21378H105.556V35.077C105.556 35.5867 105.969 35.9954 106.474 35.9954H111.314C111.819 35.9954 112.233 35.5821 112.233 35.077V7.21378H122.077C122.436 7.20918 122.757 6.99796 122.909 6.67653L125.411 1.30867C125.696 0.697959 125.25 0 124.58 0Z"]'
    );

    // expect the path to exist
    expect(virtoLogoPath).toBeInTheDocument();
  });
});
