import {
  CalendarToday,
  Home,
  Mail,
  Person,
  Settings
} from "@mui/icons-material";
import React from "react";
import SidebarItem from "./SidebarItem";
import { action } from "@storybook/addon-actions";

export default {
  component: SidebarItem,
  title: "Layout/SidebarItem"
};

const Template = args => <SidebarItem {...args} onClick={action("onClick")} />;

export const Default = Template.bind({});
Default.args = { icon: <Home />, name: "Home" };

export const IconStyle = Template.bind({});
IconStyle.args = {
  icon: <Home />,
  iconStyle: { border: "1px solid blue", minWidth: 20 },
  name: "Home"
};

export const TextStyle = Template.bind({});
TextStyle.args = {
  icon: <Home />,
  name: "Home",
  textStyle: { border: "1px solid blue" }
};

export const Selected = Template.bind({});
Selected.args = { icon: <Person />, name: "Profile", selected: true };

export const Disabled = Template.bind({});
Disabled.args = {
  count: 2,
  disabled: true,
  icon: <CalendarToday />,
  name: "Calendar"
};

export const WithCount = Template.bind({});
WithCount.args = { count: 12, icon: <Mail />, name: "Inbox" };

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
