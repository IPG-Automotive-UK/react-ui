import { Meta, Story } from "@storybook/react";

import AppHeader from ".";
import { AppHeaderProps } from "./AppHeader.types";
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

const Template: Story<AppHeaderProps> = args => {
  // get theme

  // theme mode state
  const [mode, setMode] = React.useState<"light" | "dark" | undefined>(
    args.mode
  );

  // use effect to set the mode when the mode prop changes
  React.useEffect(() => {
    setMode(args.mode);
  }, [args.mode]);

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

// default story
export const Default = Template.bind({});
Default.args = {
  appName: "APP NAME",
  mode: "light",
  username: "Ruud van Nistelrooy"
};

// default story
export const SearchBarAsChild = Template.bind({});
SearchBarAsChild.args = {
  appName: "APP NAME",
  children: <SearchBar />,
  mode: "light",
  username: "Ruud van Nistelrooy"
};
