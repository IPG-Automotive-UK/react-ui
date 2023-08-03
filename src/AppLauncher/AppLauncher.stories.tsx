import { Meta, StoryFn } from "@storybook/react";

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

const Template: StoryFn<AppLauncherProps> = args => {
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

export const Default = {
  render: Template,

  args: {
    baseUrl: "http://localhost:3000",
    showLogo: true
  }
};

export const HiddenLogo = {
  render: Template,

  args: {
    ...Default.args,
    showLogo: false
  }
};
