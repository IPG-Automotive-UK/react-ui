import React from "react";
import SidebarDivider from "./SidebarDivider";

export default {
  component: SidebarDivider,
  parameters: {
    actions: {
      disabled: true
    },
    controls: {
      disabled: true
    }
  },
  title: "Layout/SidebarDivider"
};

const Template = () => {
  return <SidebarDivider />;
};

export const Default = Template.bind({});
Default.args = {};
