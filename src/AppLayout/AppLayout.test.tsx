import {
  Default as SidebarItemDefault,
  Disabled as SidebarItemDisabled,
  Nested as SidebarItemNested,
  Selected as SidebarItemSelected,
  WithCount as SidebarItemWithCount
} from "../Sidebar/SidebarItem/SidebarItem.stories";
import { render, screen } from "@testing-library/react";

import AppLayout from ".";
import React from "react";
import SidebarDivider from "../Sidebar/SidebarDivider";
import SidebarItem from "../Sidebar/SidebarItem";
import mediaQuery from "css-mediaquery";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

// a set of default inputs so that tests can change what they are testing
const defaultInputs = {
  appName: "App Name",
  content: <div>App Content goes here</div>,
  onChangePassword: vi.fn(),
  onLogout: vi.fn(),
  sidebarContent: (
    <>
      <SidebarItem {...SidebarItemDefault.args} />
      <SidebarItem {...SidebarItemSelected.args} />
      <SidebarDivider />
      <SidebarItem {...SidebarItemDisabled.args} />
      <SidebarItem {...SidebarItemWithCount.args} />
      <SidebarDivider />
      <SidebarItem {...SidebarItemNested.args} />
    </>
  ),
  username: "Joe Bloggs"
};

// implementation of matchMedia for testing
// see docs https://mui.com/material-ui/react-use-media-query/#testing
function createMatchMedia(width: number) {
  return (query: string) => ({
    addEventListener: vi.fn(),
    addListener: () => {},
    dispatchEvent: vi.fn(),
    matches: mediaQuery.match(query, { width }),
    media: query,
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: () => {}
  });
}

// tests for the app layout component
describe("AppLayout", () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });
  test("shows first and last initial of username", () => {
    render(<AppLayout {...defaultInputs} username="Ruud van Nistelrooy" />);
    expect(screen.getByText(/RN/i)).toBeInTheDocument();
  });
  test("should show app name", () => {
    render(<AppLayout {...defaultInputs} appName="APP NAME" />);
    expect(screen.getByText(/APP NAME/i)).toBeInTheDocument();
  });
  test("should show app version", () => {
    render(<AppLayout {...defaultInputs} appVersion="1.0.0" />);
    expect(screen.getByText(/1.0.0/i)).toBeInTheDocument();
  });
  test("should display content", () => {
    render(
      <AppLayout
        {...defaultInputs}
        content={<div data-testid="main-content">More content goes here</div>}
      />
    );

    expect(screen.getByTestId("main-content")).toBeInTheDocument();
  });
  test("should display sidebar content", () => {
    render(
      <AppLayout
        {...defaultInputs}
        sidebarContent={
          <div data-testid="sidebar-content">
            <SidebarItem {...SidebarItemDefault.args} />
            <SidebarItem {...SidebarItemSelected.args} />
            <SidebarDivider />
            <SidebarItem {...SidebarItemDisabled.args} />
            <SidebarItem {...SidebarItemWithCount.args} />
            <SidebarDivider />
            <SidebarItem {...SidebarItemNested.args} />
          </div>
        }
      />
    );
    expect(screen.getByTestId("sidebar-content")).toBeInTheDocument();
  });
  test("should call onChangePassword when password button is clicked", async () => {
    const user = userEvent.setup();
    const onChangePassword = vi.fn();
    render(
      <AppLayout {...defaultInputs} onChangePassword={onChangePassword} />
    );
    await user.click(screen.getByRole("button", { name: /JB/i }));
    await user.click(
      screen.getByRole("menuitem", { name: /Change password/i })
    );
    expect(onChangePassword).toHaveBeenCalled();
  });
  test("onLogout called on user click", async () => {
    const user = userEvent.setup();
    const onLogout = vi.fn();
    render(<AppLayout {...defaultInputs} onLogout={onLogout} />);
    await user.click(screen.getByRole("button", { name: /JB/i }));
    await user.click(screen.getByRole("menuitem", { name: /Logout/i }));
    expect(onLogout).toHaveBeenCalled();
  });
});
