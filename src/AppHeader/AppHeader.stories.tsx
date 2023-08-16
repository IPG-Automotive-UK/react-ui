import { Meta, StoryFn } from "@storybook/react";

import AppHeader from ".";
import { AppHeaderProps } from "./AppHeader.types";
import { IconButton } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import React from "react";
import SearchBar from "../SearchBar";
import ThemeProvider from "../ThemeProvider";
import ToggleColorMode from "../ToggleColorMode";
import VirtoLogo from "../SvgIcons/VirtoLogo";
import { fixedPositionComponentDecorator } from "../../.storybook/decorators";
import { useDarkMode } from "storybook-dark-mode";

/**
 * Story metadata
 */
const meta: Meta<typeof AppHeader> = {
  component: AppHeader,
  decorators: [fixedPositionComponentDecorator({ minHeight: 58 })],
  title: "Layout/AppHeader"
};
export default meta;

/**
 * Story template for the AppHeader component
 * This provides some state management for the component to make it easier to use in Storybook
 */
const Template: StoryFn<AppHeaderProps> = args => {
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

export const Default = {
  args: {
    appName: "APP NAME",
    mode: "light",
    username: "Ruud van Nistelrooy"
  },

  render: Template
};

export const SingleChild = {
  args: {
    appName: "APP NAME",
    children: (
      <IconButton sx={{ mr: 1 }}>
        <Notifications color="info" fontSize="large" />
      </IconButton>
    ),
    mode: "light",
    username: "Ruud van Nistelrooy"
  },

  render: Template
};

export const MultipleChildren = {
  args: {
    appName: "APP NAME",
    children: (
      <>
        <SearchBar />
        <ToggleColorMode mode={"light"} onChange={() => {}} />
      </>
    ),
    mode: "light",
    username: "Ruud van Nistelrooy"
  },

  render: Template
};

export const MultipleChildrenAndLogo = {
  args: {
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
  },

  render: Template
};
