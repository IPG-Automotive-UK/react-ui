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
  args: { icon: <Home />, name: "Home" },
  render: Template
};

export const IconStyle = {
  args: {
    icon: <Home />,
    iconStyle: { border: "1px solid blue", minWidth: 20 },
    name: "Home"
  },

  render: Template
};

export const TextStyle = {
  args: {
    icon: <Home />,
    name: "Home",
    textStyle: { border: "1px solid blue" }
  },

  render: Template
};

export const Selected = {
  args: { icon: <Person />, name: "Profile", selected: true },
  render: Template
};

export const Disabled = {
  args: {
    count: 2,
    disabled: true,
    icon: <CalendarToday />,
    name: "Calendar"
  },

  render: Template
};

export const WithCount = {
  args: { count: 12, icon: <Mail />, name: "Inbox" },
  render: Template
};

export const Nested = {
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
  },

  render: Template
};

export const NestedInitiallyOpen = {
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
  },

  render: Template
};

export const Stacked = {
  args: { display: "stacked", icon: <Home />, name: "Home" },
  render: Template
};

export const NestedAndStacked = {
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
  },

  render: Template
};

export const NestedAndSelected = {
  args: {
    display: "stacked",
    icon: <Person />,
    name: "Profile",
    selected: true
  },

  render: Template
};
