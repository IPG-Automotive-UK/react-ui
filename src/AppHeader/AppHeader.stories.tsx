import { Meta, Story } from "@storybook/react";

import AppHeader from ".";
import { AppHeaderProps } from "./AppHeader.types";
import { IconButton } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import React from "react";
import SearchBar from "../SearchBar";
import ThemeProvider from "../ThemeProvider";
import { action } from "@storybook/addon-actions";

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
  // theme mode state
  const [mode, setMode] = React.useState<"light" | "dark" | undefined>(
    args.mode
  );

  // use effect to set the mode when the mode prop changes
  React.useEffect(() => {
    setMode(args.mode);
  }, [args.mode]);

  // return the component
  return (
    <ThemeProvider theme={mode}>
      <AppHeader
        {...args}
        mode={mode}
        onColourModeChange={newMode => {
          setMode(newMode);
          action("onChange")(newMode);
        }}
      >
        {args.children}
      </AppHeader>
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
export const SearchBarAsChild = Template.bind({});
SearchBarAsChild.args = {
  appName: "APP NAME",
  children: <SearchBar />,
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
