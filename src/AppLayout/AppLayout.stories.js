import {
  Default as SidebarItemDefault,
  Disabled as SidebarItemDisabled,
  Nested as SidebarItemNested,
  Selected as SidebarItemSelected,
  WithCount as SidebarItemWithCount
} from "../Sidebar/SidebarItem/SidebarItem.stories";

import AppLayout from "../AppLayout";
import React from "react";
import SidebarDivider from "../Sidebar/SidebarDivider";
import SidebarItem from "../Sidebar/SidebarItem";
import { version } from "../../package.json";

export default {
  component: AppLayout,
  title: "Layout/AppLayout"
};

const Template = args => {
  return <AppLayout {...args} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  appName: "APP NAME",
  appUrls: [
    {
      "VIRTO.BUILD": "https://someurl.com",
      "VIRTO.DATA": "https://someurl.com",
      "VIRTO.FLEET": "https://someurl.com",
      "VIRTO.ID": "https://someurl.com"
    }
  ],
  appVersion: version,
  /**
   * Content set to something that forces the content to be scrollable
   */
  content: (
    <div
      style={{
        height: "110vw",
        padding: "16px",
        width: "110vw"
      }}
    >
      App Content goes here
    </div>
  ),
  mode: "light",
  sidebarContent: (
    <>
      <SidebarItem {...SidebarItemSelected.args} />
      <SidebarItem {...SidebarItemDefault.args} />
      <SidebarDivider />
      <SidebarItem {...SidebarItemDisabled.args} />
      <SidebarItem {...SidebarItemWithCount.args} />
      <SidebarDivider />
      <SidebarItem {...SidebarItemNested.args} />
    </>
  ),
  username: "Ruud van Nistelrooy"
};
Default.parameters = {
  layout: "fullscreen" // removes the padding from the story iframe for this story
};
