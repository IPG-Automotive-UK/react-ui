import {
  CalendarToday,
  Home,
  Mail,
  Person,
  Settings
} from "@mui/icons-material";
import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import SidebarItem from "./SidebarItem";
import { SidebarItemProps } from "./SidebarItem.types";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof SidebarItem> = {
  component: SidebarItem,
  title: "Layout/SidebarItem"
};
export default meta;

/**
 * Story template for the SidebarItem component
 */
const Template: StoryFn<SidebarItemProps> = args => (
  <SidebarItem {...args} onClick={action("onClick")} />
);

export const Default = {
  render: Template,
  args: { icon: <Home />, name: "Home" }
};

export const IconStyle = {
  render: Template,

  args: {
    icon: <Home />,
    iconStyle: { border: "1px solid blue", minWidth: 20 },
    name: "Home"
  }
};

export const TextStyle = {
  render: Template,

  args: {
    icon: <Home />,
    name: "Home",
    textStyle: { border: "1px solid blue" }
  }
};

export const Selected = {
  render: Template,
  args: { icon: <Person />, name: "Profile", selected: true }
};

export const Disabled = {
  render: Template,

  args: {
    count: 2,
    disabled: true,
    icon: <CalendarToday />,
    name: "Calendar"
  }
};

export const WithCount = {
  render: Template,
  args: { count: 12, icon: <Mail />, name: "Inbox" }
};

export const Nested = {
  render: Template,

  args: {
    children: [
      <SidebarItem key="default" {...Default.args} />,
      <SidebarItem key="withCount" {...WithCount.args}>
        <SidebarItem key="default" {...Default.args} />
        <SidebarItem key="disabled" {...Disabled.args} />
      </SidebarItem>
    ],
    icon: <Settings />,
    name: "Settings"
  }
};

export const NestedInitiallyOpen = {
  render: Template,

  args: {
    children: [
      <SidebarItem key="default" {...Default.args} />,
      <SidebarItem key="withCount" {...WithCount.args}>
        <SidebarItem key="default" {...Default.args} />
        <SidebarItem key="disabled" {...Disabled.args} />
      </SidebarItem>
    ],
    icon: <Settings />,
    initialOpen: true,
    name: "Settings"
  }
};

export const Stacked = {
  render: Template,
  args: { display: "stacked", icon: <Home />, name: "Home" }
};

export const NestedAndStacked = {
  render: Template,

  args: {
    children: [
      <SidebarItem key="default" {...Default.args} display="stacked" />,
      <SidebarItem key="withCount" {...WithCount.args} display="stacked">
        <SidebarItem key="default" {...Default.args} display="stacked" />
        <SidebarItem key="disabled" {...Disabled.args} display="stacked" />
      </SidebarItem>
    ],
    display: "stacked",
    icon: <Settings />,
    name: "Settings"
  }
};

export const NestedAndSelected = {
  render: Template,

  args: {
    display: "stacked",
    icon: <Person />,
    name: "Profile",
    selected: true
  }
};
