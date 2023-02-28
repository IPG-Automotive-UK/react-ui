import { render, screen } from "@testing-library/react";

import AppHeader from "./AppHeader";
import React from "react";

// a set of default inputs so that tests can change what theyre testing
const defaultInputs = {
  onChangePassword: jest.fn(),
  onLogout: jest.fn(),
  onModeChange: jest.fn(),
  username: "Joe Bloggs"
};

// test app name in the component
describe("AppHeader", () => {
  test("should render app name", () => {
    render(<AppHeader {...defaultInputs} appName="APP NAME" />);
    expect(screen.getByText("APP NAME")).toBeInTheDocument();
  });
});
