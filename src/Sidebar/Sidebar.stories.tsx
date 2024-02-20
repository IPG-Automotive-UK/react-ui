import { Home, Mail, Person, Settings } from "@mui/icons-material";
import { Meta, StoryFn } from "@storybook/react";
import {
  Default as SidebarItemDefault,
  Disabled as SidebarItemDisabled,
  Nested as SidebarItemNested,
  NestedAndStacked as SidebarItemNestedAndStacked,
  Selected as SidebarItemSelected,
  WithCount as SidebarItemWithCount
} from "./SidebarItem/SidebarItem.stories";

import React from "react";
import Sidebar from "./Sidebar";
import SidebarDivider from "./SidebarDivider";
import SidebarItem from "./SidebarItem";
import { SidebarProps } from "./Sidebar.types";
import { version } from "../../package.json";

/**
 * Story metadata
 */
const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: "Layout/Sidebar"
};
export default meta;

const Template: StoryFn<SidebarProps> = args => (
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

export const Default = {
  args: {
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
  },

  render: Template
};

export const HiddenLogo = {
  args: {
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
  },

  render: Template
};

export const HiddenVersion = {
  args: {
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
  },

  render: Template
};

export const ItemsOnly = {
  args: {
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
  },

  render: Template
};

export const IconsOnly = {
  args: {
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
  },

  render: Template
};

export const CustomLogoLink = {
  args: {
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
  },

  render: Template
};

export const StackedSidebar = {
  args: {
    appVersion: version,
    children: (
      <>
        <SidebarItem {...SidebarItemDefault.args} display="stacked" />
        <SidebarItem {...SidebarItemSelected.args} display="stacked" />
        <SidebarDivider />
        <SidebarItem {...SidebarItemDisabled.args} display="stacked" />
        <SidebarItem {...SidebarItemWithCount.args} display="stacked" />
        <SidebarDivider />
        <SidebarItem {...SidebarItemNestedAndStacked.args} display="stacked" />
      </>
    ),
    showLogo: true,
    showVersion: true
  },

  render: Template
};
