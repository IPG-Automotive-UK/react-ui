import {
  Default as SidebarItemDefault,
  Disabled as SidebarItemDisabled,
  Nested as SidebarItemNested,
  Selected as SidebarItemSelected,
  WithCount as SidebarItemWithCount
} from "../Sidebar/SidebarItem/SidebarItem.stories";

import AppHeader from "../AppHeader";
import React from "react";
import SidebarDivider from "../Sidebar/SidebarDivider";
import SidebarItem from "../Sidebar/SidebarItem";
import { action } from "@storybook/addon-actions";
import { version } from "../../package.json";

export default {
  component: AppHeader,
  title: "Layout/AppHeader"
};

const Template = args => {
  const [mode, setMode] = React.useState("light");
  React.useEffect(() => {
    setMode(args.mode);
  }, [args.mode]);
  return (
    <AppHeader
      {...args}
      mode={mode}
      onChange={newMode => {
        setMode(newMode);
        action("onChange")(newMode);
      }}
    />
  );
};

// default story
export const Default = Template.bind({});
Default.args = {
  appName: "APP NAME",
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
  mode: "light",
  showLogo: true,
  showVersion: true,
  username: "Ruud van Nistelrooy"
};
