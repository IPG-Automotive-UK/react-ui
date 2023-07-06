import { Box, IconButton } from "@mui/material";
import { DecoratorFn, Meta, Story } from "@storybook/react";

import AppHeader from ".";
import { AppHeaderProps } from "./AppHeader.types";
import { Notifications } from "@mui/icons-material";
import React from "react";
import SearchBar from "../SearchBar";
import ThemeProvider from "../ThemeProvider";
import ToggleColorMode from "../ToggleColorMode";
import VirtoLogo from "../SvgIcons/VirtoLogo";
import { useDarkMode } from "storybook-dark-mode";

/**
 * Story decorator
 * This helps bound the component to the Storybook UI otherwise the fixed positioning of the AppHeader can render outside of the bounds of where the story is rendering
 */
const decorator: DecoratorFn = storyFcn => (
  <Box
    sx={{
      height: theme => theme.mixins.toolbar,
      transform: "scale(1)"
    }}
  >
    {storyFcn()}
  </Box>
);

/**
 * Story metadata
 */
const meta: Meta<typeof AppHeader> = {
  component: AppHeader,
  decorators: [decorator],
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
 * Story for the AppHeader component where a single child is passed
 */
export const SingleChild = Template.bind({});
SingleChild.args = {
  appName: "APP NAME",
  children: (
    <IconButton sx={{ mr: 1 }}>
      <Notifications color="info" fontSize="large" />
    </IconButton>
  ),
  mode: "light",
  username: "Ruud van Nistelrooy"
};

/**
 * Story for the AppHeader component where a multiple children are passed
 */
export const MultipleChildren = Template.bind({});
MultipleChildren.args = {
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
 * Story for the AppHeader component where multiple children and a logo are passed
 */
export const MultipleChildrenAndLogo = Template.bind({});
MultipleChildrenAndLogo.args = {
  appLogo: (
    <VirtoLogo
      sx={{
        height: 50,
        width: 140
      }}
    />
  ),
  children: (
    <>
      <SearchBar />
      <ToggleColorMode mode={"light"} onChange={() => {}} />
    </>
  ),
  mode: "light",
  username: "Ruud van Nistelrooy"
};
