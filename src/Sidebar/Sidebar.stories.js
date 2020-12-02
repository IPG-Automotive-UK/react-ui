import {
  Default as SidebarItemDefault,
  Disabled as SidebarItemDisabled,
  Nested as SidebarItemNested,
  Selected as SidebarItemSelected,
  WithCount as SidebarItemWithCount
} from "./SidebarItem/SidebarItem.stories";
import React from "react";
import Sidebar from "./Sidebar";
import SidebarDivider from "./SidebarDivider";
import SidebarItem from "./SidebarItem";
import { version } from "../../package.json";

export default {
  component: Sidebar,
  subcomponents: { SidebarDivider, SidebarItem },
  title: "Layout/Sidebar"
};

const Template = args => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      minHeight: 500,
      width: 240
    }}
  >
    <Sidebar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  appVersion: `v${version}`,
  children: (
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
  logoSrc: "/ipgLogoNoText.png"
};
