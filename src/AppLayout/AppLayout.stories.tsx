import { Meta, StoryFn } from "@storybook/react";
import {
  Default as SidebarItemDefault,
  Disabled as SidebarItemDisabled,
  Selected as SidebarItemSelected,
  WithCount as SidebarItemWithCount
} from "../Sidebar/SidebarItem/SidebarItem.stories";

import AppLayout from ".";
import { AppLayoutProps } from "./AppLayout.types";
import React from "react";
import SidebarDivider from "../Sidebar/SidebarDivider";
import SidebarItem from "../Sidebar/SidebarItem";
import ThemeProvider from "../ThemeProvider";
import { fixedPositionComponentDecorator } from "../../.storybook/decorators";
import { useDarkMode } from "storybook-dark-mode";
import { version } from "../../package.json";

/**
 * Story metadata
 */
const meta: Meta<typeof AppLayout> = {
  component: AppLayout,
  decorators: [
    fixedPositionComponentDecorator({
      height: "100vh",
      width: "100vw"
    })
  ],
  title: "Layout/AppLayout"
};
export default meta;

const Template: StoryFn<AppLayoutProps> = args => {
  // get the dark mode state from Storybook
  const isDarkMode = useDarkMode();
  const theme = isDarkMode ? "dark" : "light";

  return (
    <ThemeProvider theme={theme}>
      <AppLayout {...args} />
    </ThemeProvider>
  );
};

export const Default = {
  args: {
    appName: "APP NAME",
    appVersion: version,
    baseUrl: "http://localhost:3000",
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
    sidebarContent: (
      <>
        <SidebarItem {...SidebarItemSelected.args} display="stacked" />
        <SidebarItem {...SidebarItemDefault.args} display="stacked" />
        <SidebarDivider />
        <SidebarItem {...SidebarItemDisabled.args} display="stacked" />
        <SidebarItem {...SidebarItemWithCount.args} display="stacked" />
      </>
    ),
    username: "Ruud van Nistelrooy"
  },

  parameters: {
    layout: "fullscreen" // removes the padding from the story iframe for this story
  },

  render: Template
};
