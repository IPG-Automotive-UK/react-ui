import { render, screen } from "@testing-library/react";

import AppLayout from "./AppLayout";
import React from "react";

// a set of default inputs so that tests can change what theyre testing
const defaultInputs = {
  onChangePassword: jest.fn(),
  onLogout: jest.fn(),
  onModeChange: jest.fn(),
  username: "Joe Bloggs"
};

// test app name in the component
describe("AppLayout", () => {
  test("should render app name", () => {
    render(<AppLayout {...defaultInputs} appName="APP NAME" />);
    expect(screen.getByText("APP NAME")).toBeInTheDocument();
  });
});
