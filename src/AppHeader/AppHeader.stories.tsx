import { Meta, Story } from "@storybook/react";

import AppHeader from ".";
import { AppHeaderProps } from "./AppHeader.types";
import { IconButton } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import React from "react";
import SearchBar from "../SearchBar";
import ThemeProvider from "../ThemeProvider";
import ToggleColorMode from "../ToggleColorMode";
import { useDarkMode } from "storybook-dark-mode";

/**
 * Story metadata
 */
const meta: Meta<typeof AppHeader> = {
  component: AppHeader,
  title: "Layout/AppHeader"
};
export default meta;

/**
 * Story template for the AppHeader component
 * This provides some state management for the component to make it easier to use in Storybook
 */
const Template: Story<AppHeaderProps> = args => {
  // get the dark mode state from Storybook
  const isDarkMode = useDarkMode();
  const theme = isDarkMode ? "dark" : "light";

  // return the component
  return (
    <ThemeProvider theme={theme}>
      <AppHeader {...args}>{args.children}</AppHeader>
    </ThemeProvider>
  );
};

/**
 * Default story for the AppHeader component
 */
export const Default = Template.bind({});
Default.args = {
  appName: "APP NAME",
  mode: "light",
  username: "Ruud van Nistelrooy"
};

/**
 * Story for the AppHeader component where a SearchBar is passed as a child
 */
export const SearchBarAndDarkModeAsChild = Template.bind({});
SearchBarAndDarkModeAsChild.args = {
  appName: "APP NAME",
  children: (
    <>
      <SearchBar />
      <ToggleColorMode mode={"light"} onChange={() => {}} />
    </>
  ),
  mode: "light",
  username: "Ruud van Nistelrooy"
};

/**
 * Story for the AppHeader component where an IconButton is passed as a child
 */
export const IconButtonAsChild = Template.bind({});
IconButtonAsChild.args = {
  appName: "APP NAME",
  children: (
    <IconButton>
      <Notifications color="info" fontSize="large" />
    </IconButton>
  ),
  mode: "light",
  username: "Ruud van Nistelrooy"
};
