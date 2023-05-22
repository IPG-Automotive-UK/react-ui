import {
  CalendarToday,
  Home,
  Mail,
  Person,
  Settings
} from "@mui/icons-material";
import { Meta, Story } from "@storybook/react";

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
const Template: Story<SidebarItemProps> = args => (
  <SidebarItem {...args} onClick={action("onClick")} />
);

/**
 * Default story for the SidebarItem component
 */
export const Default = Template.bind({});
Default.args = { icon: <Home />, name: "Home" };

/**
 * Story for the SidebarItem component with a custom icon style
 */
export const IconStyle = Template.bind({});
IconStyle.args = {
  icon: <Home />,
  iconStyle: { border: "1px solid blue", minWidth: 20 },
  name: "Home"
};

/**
 * Story for the SidebarItem component with a custom text style
 */
export const TextStyle = Template.bind({});
TextStyle.args = {
  icon: <Home />,
  name: "Home",
  textStyle: { border: "1px solid blue" }
};

/**
 * Story for the SidebarItem component with a the item selected
 */
export const Selected = Template.bind({});
Selected.args = { icon: <Person />, name: "Profile", selected: true };

/**
 * Story for the SidebarItem component with a the item disabled
 */
export const Disabled = Template.bind({});
Disabled.args = {
  count: 2,
  disabled: true,
  icon: <CalendarToday />,
  name: "Calendar"
};

/**
 * Story for the SidebarItem component with a count
 */
export const WithCount = Template.bind({});
WithCount.args = { count: 12, icon: <Mail />, name: "Inbox" };

/**
 * Story for the SidebarItem that has nested items
 */
export const Nested = Template.bind({});
Nested.args = {
  children: [
    <SidebarItem key="default" {...Default.args} />,
    <SidebarItem key="withCount" {...WithCount.args}>
      <SidebarItem key="default" {...Default.args} />
      <SidebarItem key="disabled" {...Disabled.args} />
    </SidebarItem>
  ],
  icon: <Settings />,
  name: "Settings"
};

/**
 * Story for the SidebarItem that has nested items and is initially open
 */
export const NestedInitiallyOpen = Template.bind({});
NestedInitiallyOpen.args = {
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
};

/**
 * Story for the SidebarItem that has a stacked display
 */
export const Stacked = Template.bind({});
Stacked.args = { display: "stacked", icon: <Home />, name: "Home" };

/**
 * Story for the SidebarItem that has nested items and Stacked display
 */
export const NestedAndStacked = Template.bind({});
NestedAndStacked.args = {
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
};

/**
 * Story for the SidebarItem component that is nested with a the item selected
 */
export const NestedAndSelected = Template.bind({});
NestedAndSelected.args = {
  display: "stacked",
  icon: <Person />,
  name: "Profile",
  selected: true
};
