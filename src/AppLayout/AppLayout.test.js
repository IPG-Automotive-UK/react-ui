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
  test("should render app name", () => {
    render(<AppLayout {...defaultInputs} appName="APP NAME" />);
    expect(screen.getByText("APP NAME")).toBeInTheDocument();
  });
});
