import { Meta, Story } from "@storybook/react";

import AppLauncher from "./AppLauncher";
import { AppLauncherProps } from "./AppLauncher.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof AppLauncher> = {
  component: AppLauncher,
  title: "Layout/AppLauncher"
};
export default meta;

const Template: Story<AppLauncherProps> = args => {
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
      <AppLauncher {...args} />
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
