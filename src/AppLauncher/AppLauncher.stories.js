import AppLauncher from "./AppLauncher";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: AppLauncher,
  title: "Layout/AppLauncher"
};

const Template = args => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: 500,
        padding: "20px",
        width: 260
      }}
    >
      <AppLauncher {...args} onMenuClick={action("onMenuClick")} />
    </div>
  );
};

// default story
export const Default = Template.bind({});
Default.args = {
  baseUrl: "http://localhost:3000",
  showLogo: true
};

// hidden logo story
export const HiddenLogo = Template.bind({});
HiddenLogo.args = {
  ...Default.args,
  showLogo: false
};
