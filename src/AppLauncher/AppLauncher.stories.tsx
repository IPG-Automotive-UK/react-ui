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
  args: {
    baseUrl: "http://localhost:3000",
    showLogo: true
  },

  render: Template
};

export const HiddenLogo = {
  args: {
    ...Default.args,
    showLogo: false
  },

  render: Template
};
