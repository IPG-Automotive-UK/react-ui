import {
  Default as SidebarItemDefault,
  Disabled as SidebarItemDisabled,
  Nested as SidebarItemNested,
  Selected as SidebarItemSelected,
  WithCount as SidebarItemWithCount
} from "../Sidebar/SidebarItem/SidebarItem.stories";
import { render, screen } from "@testing-library/react";

import AppLayout from "./AppLayout";
import React from "react";
import SidebarDivider from "../Sidebar/SidebarDivider";
import SidebarItem from "../Sidebar/SidebarItem";

// a set of default inputs so that tests can change what theyre testing
const defaultInputs = {
  appName: "App Name",
  content: <div>App Content goes here</div>,
  onChangePassword: jest.fn(),
  onLogout: jest.fn(),
  onModeChange: jest.fn(),
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

// test app name in the component
describe("AppLayout", () => {
  test("should display app name", () => {
    render(<AppLayout {...defaultInputs} />);
    screen.getByText(defaultInputs.appName);
  });

  test("should display content", () => {
    render(<AppLayout {...defaultInputs} />);
    screen.getByText("App Content goes here");
  });
});
