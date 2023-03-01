import { Home, Mail, Person, Settings } from "@mui/icons-material";
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
      width: args.width || 240
    }}
  >
    <Sidebar {...args} />
  </div>
);

// default story
export const Default = Template.bind({});
Default.args = {
  appVersion: version,
  children: (
    <>
      <SidebarItem {...SidebarItemDefault.args} />
      <SidebarItem {...SidebarItemSelected.args} />
      <SidebarDivider />
      <SidebarItem {...SidebarItemDisabled.args} />
      <SidebarItem {...SidebarItemWithCount.args} />
    </>
  ),
  showLogo: true,
  showVersion: true
};

// hidden logo story
export const HiddenLogo = Template.bind({});
HiddenLogo.args = {
  appVersion: version,
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
  showLogo: false,
  showVersion: true
};

// hidden version story
export const HiddenVersion = Template.bind({});
HiddenVersion.args = {
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
  showLogo: true,
  showVersion: false
};

// items only story
export const ItemsOnly = Template.bind({});
ItemsOnly.args = {
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
  showLogo: false,
  showVersion: false
};

// icons only story
export const IconsOnly = Template.bind({});
IconsOnly.args = {
  children: (
    <>
      <SidebarItem icon={<Home />} name="" />
      <SidebarItem icon={<Mail />} name="" selected />
      <SidebarItem icon={<Person />} name="" />
      <SidebarItem icon={<Settings />} name="" />
    </>
  ),
  showLogo: false,
  showVersion: false,
  width: 60
};

// Custom Logo Link story
export const CustomLogoLink = Template.bind({});
CustomLogoLink.args = {
  appVersion: version,
  children: (
    <>
      <SidebarItem {...SidebarItemDefault.args} />
      <SidebarItem {...SidebarItemSelected.args} />
      <SidebarDivider />
      <SidebarItem {...SidebarItemDisabled.args} />
      <SidebarItem {...SidebarItemWithCount.args} />
    </>
  ),
  showLogo: true,
  showVersion: true
};
