import {
  CalendarToday,
  Home,
  Mail,
  Person,
  Settings
} from "@material-ui/icons";
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
    <SidebarItem
      key="withCount"
      {...WithCount.args}
      children={[
        <SidebarItem key="default" {...Default.args} />,
        <SidebarItem key="disabled" {...Disabled.args} />
      ]}
    />
  ],
  icon: <Settings />,
  name: "Settings"
};

export const NestedInitiallyOpen = Template.bind({});
NestedInitiallyOpen.args = {
  children: [
    <SidebarItem key="default" {...Default.args} />,
    <SidebarItem
      key="withCount"
      {...WithCount.args}
      children={[
        <SidebarItem key="default" {...Default.args} />,
        <SidebarItem key="disabled" {...Disabled.args} />
      ]}
    />
  ],
  icon: <Settings />,
  initialOpen: true,
  name: "Settings"
};
